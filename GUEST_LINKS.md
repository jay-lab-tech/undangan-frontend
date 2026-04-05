# Guest Link Generator

Generator ini dipakai untuk membuat link undangan berbeda-beda untuk setiap tamu.

## File input

Isi daftar tamu di:

`data/guests.json`

Contoh format:

```json
[
  {
    "name": "Bapak Andi",
    "group": "Keluarga"
  },
  {
    "name": "Ibu Rina Sekeluarga",
    "group": "Keluarga"
  }
]
```

## Menjalankan generator

Gunakan base URL default lokal:

```bash
npm run guests:generate
```

Gunakan URL custom:

```bash
node scripts/generate-guest-links.mjs "https://domain-anda.com/index.html"
```

## File output

Hasil generator akan dibuat di folder:

- `output/guest-links.csv`
- `output/guest-links.md`
- `output/wa-messages.csv`
- `output/wa-messages.md`

## Contoh hasil link

```text
https://domain-anda.com/index.html?to=Bapak%20Andi
```

## Kegunaan

- Dipakai saat kirim undangan per tamu.
- Nama tamu akan tampil di welcome screen.
- Cocok untuk broadcast WhatsApp atau list admin tamu.

## Generator pesan WhatsApp

Untuk membuat pesan WhatsApp otomatis:

```bash
npm run wa:generate
```

Atau gunakan URL custom:

```bash
node scripts/generate-wa-messages.mjs "https://domain-anda.com/index.html"
```
