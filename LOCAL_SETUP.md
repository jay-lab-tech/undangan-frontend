# Local Run Guide

Project ini sudah disiapkan untuk jalan lokal dengan backend lengkap.

## Cara paling mudah

Jalankan:

```bat
start-local.bat
```

Script itu akan mencoba menyalakan:

- MySQL Laragon di port `3306`
- Backend lokal di port `8000`
- Frontend lokal di port `8081`

## URL

- Undangan: `http://127.0.0.1:8081/index.html`
- Dashboard: `http://127.0.0.1:8081/dashboard.html`
- Backend health check: `http://localhost:8000/api/health`

## Login Dashboard

- Email: `admin@studio.com`
- Password: `Studio2026!`

## Script yang tersedia

- `start-local.bat`: menyalakan semua komponen
- `start-backend-local.bat`: hanya backend
- `start-frontend-local.bat`: hanya frontend

## Catatan

- Biarkan jendela backend dan frontend tetap terbuka selama project dipakai.
- Frontend lokal memakai port `8081` supaya tidak bentrok dengan project lain yang memakai `8080`.
- Backend lokal memakai `http://localhost:8000/`.
- Konfigurasi backend ada di `backend/.env`.
