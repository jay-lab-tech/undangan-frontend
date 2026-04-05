# Deploy Guide: Supabase + Vercel

Panduan ini disusun untuk project di folder root ini dengan backend PHP di `backend/`.

## 1. Buat project Supabase

1. Buka dashboard Supabase.
2. Buat project baru.
3. Simpan:
   - host database
   - port database
   - database name
   - user
   - password

Catatan:
- Untuk project baru Supabase Postgres, port umumnya `5432`.
- Database name default sering bernilai `postgres`.

## 2. Set backend lokal ke PostgreSQL Supabase

File yang dipakai:

- `backend/.env`

Isi minimal yang dibutuhkan:

```env
APP_NAME=Kamu
APP_KEY=
BASEURL=http://localhost:8000/
DEBUG=false
LOG=false

DB_DRIV=pgsql
DB_HOST=YOUR_SUPABASE_HOST
DB_PORT=5432
DB_NAME=postgres
DB_USER=YOUR_SUPABASE_USER
DB_PASS=YOUR_SUPABASE_PASSWORD

JWT_EXP=3600
JWT_KEY=YOUR_RANDOM_SECRET

MONGODB_URI=
MONGODB_DB=
MONGODB_COLLECTION=
RATE_LIMIT=120
RATE_LIMIT_WINDOW=86400
```

Lalu jalankan:

```powershell
cd D:\undangan-4.x\undangan-4.x\backend
php saya key
php saya migrasi --gen
```

Kalau migrasi sukses, database Supabase sudah terisi schema aplikasi.

## 3. Struktur GitHub

Saat ini:

- folder root belum menjadi repo Git
- folder `backend/` adalah repo Git terpisah

Ada dua opsi:

### Opsi A: Satu repo GitHub untuk semuanya

Cocok kalau frontend dan backend mau dikelola bareng.

Konsekuensi:
- `backend/.git` perlu dihapus atau dipindahkan dulu agar `backend/` jadi folder biasa di repo root

### Opsi B: Dua repo GitHub terpisah

Paling aman kalau tidak mau menyentuh struktur yang ada sekarang.

- repo 1: frontend root
- repo 2: backend

## 4. Deploy backend ke Vercel

Deploy folder:

- `backend/`

Environment variables yang perlu diisi di project backend Vercel:

```env
DB_DRIV=pgsql
DB_HOST=YOUR_SUPABASE_HOST
DB_PORT=5432
DB_NAME=postgres
DB_USER=YOUR_SUPABASE_USER
DB_PASS=YOUR_SUPABASE_PASSWORD
APP_KEY=YOUR_LOCAL_APP_KEY
JWT_KEY=YOUR_RANDOM_SECRET
BASEURL=https://YOUR-BACKEND-PROJECT.vercel.app/
DEBUG=false
LOG=false
MONGODB_URI=
MONGODB_DB=
MONGODB_COLLECTION=
RATE_LIMIT=120
RATE_LIMIT_WINDOW=86400
```

Setelah deploy, cek:

```text
https://YOUR-BACKEND-PROJECT.vercel.app/api/health
```

## 5. Deploy frontend root ke Vercel

Deploy folder:

- project root ini

Sebelum deploy frontend, ubah URL backend di file berikut:

- `index.html`
- `dashboard.html`

Bagian yang harus diganti:

```html
<body data-url="http://localhost:8000/">
```

Menjadi:

```html
<body data-url="https://YOUR-BACKEND-PROJECT.vercel.app/">
```

Catatan:
- Frontend ini memakai `data-url` sebagai base request API.
- Request API di JS memakai path relatif seperti `/api/session`, `/api/comment`, dan `/api/v2/config`.

## 6. Rapikan metadata frontend production

Di `index.html`, ganti nilai yang masih lokal:

- `og:image`
- `og:image:secure_url`
- `og:url`
- `canonical`

Contoh:

```html
<meta property="og:url" content="https://YOUR-FRONTEND-DOMAIN/index.html">
<link rel="canonical" href="https://YOUR-FRONTEND-DOMAIN/index.html">
```

## 7. Generate link tamu produksi

Sesudah domain frontend jadi, generator link tamu bisa pakai URL produksi:

```powershell
cd D:\undangan-4.x\undangan-4.x
npm run guests:generate -- "https://YOUR-FRONTEND-DOMAIN/index.html"
```

Atau:

```powershell
node scripts/generate-guest-links.mjs "https://YOUR-FRONTEND-DOMAIN/index.html"
node scripts/generate-wa-messages.mjs "https://YOUR-FRONTEND-DOMAIN/index.html"
```

## 8. Checklist verifikasi

- `backend` health check terbuka
- login dashboard berhasil
- komentar baru bisa masuk
- like dan delete komentar berjalan
- dashboard download CSV berjalan
- link tamu membuka nama tamu dengan query `?to=...`

