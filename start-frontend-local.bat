@echo off
setlocal

cd /d "%~dp0"

echo Menjalankan frontend lokal di http://127.0.0.1:8081
npm run dev:local

