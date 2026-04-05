import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const dataFile = path.join(rootDir, 'data', 'guests.json');
const outputDir = path.join(rootDir, 'output');
const csvFile = path.join(outputDir, 'guest-links.csv');
const mdFile = path.join(outputDir, 'guest-links.md');

const baseUrlArg = process.argv[2]?.trim();
const baseUrl = (baseUrlArg && baseUrlArg.length > 0)
  ? baseUrlArg
  : 'http://127.0.0.1:8081/index.html';

const normalizeBaseUrl = (value) => value.includes('?') ? value.split('?')[0] : value;

const escapeCsv = (value) => {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
};

const buildLink = (name) => `${normalizeBaseUrl(baseUrl)}?to=${encodeURIComponent(name)}`;

const main = async () => {
  const raw = await fs.readFile(dataFile, 'utf8');
  const guests = JSON.parse(raw);

  if (!Array.isArray(guests) || guests.length === 0) {
    throw new Error('data/guests.json harus berisi array tamu dan tidak boleh kosong.');
  }

  await fs.mkdir(outputDir, { recursive: true });

  const rows = guests.map((guest, index) => {
    if (!guest?.name || String(guest.name).trim().length === 0) {
      throw new Error(`Data tamu pada index ${index} tidak memiliki nama yang valid.`);
    }

    const name = String(guest.name).trim();
    const group = String(guest.group ?? '').trim();
    const link = buildLink(name);

    return {
      no: index + 1,
      name,
      group,
      link,
    };
  });

  const csvLines = [
    ['No', 'Nama Tamu', 'Grup', 'Link'].map(escapeCsv).join(','),
    ...rows.map((row) => [row.no, row.name, row.group, row.link].map(escapeCsv).join(',')),
  ];

  const mdLines = [
    '# Guest Links',
    '',
    `Base URL: ${normalizeBaseUrl(baseUrl)}`,
    '',
    ...rows.flatMap((row) => [
      `${row.no}. ${row.name}${row.group ? ` [${row.group}]` : ''}`,
      `   ${row.link}`,
      '',
    ]),
  ];

  await fs.writeFile(csvFile, csvLines.join('\n'), 'utf8');
  await fs.writeFile(mdFile, mdLines.join('\n'), 'utf8');

  console.log(`Generated ${rows.length} guest links.`);
  console.log(`CSV: ${csvFile}`);
  console.log(`Markdown: ${mdFile}`);
};

main().catch((error) => {
  console.error(error.message || String(error));
  process.exit(1);
});
