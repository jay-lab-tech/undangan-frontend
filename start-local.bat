@echo off
setlocal

set "ROOT=%~dp0"
set "MYSQLD=C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysqld.exe"
set "MYSQL_INI=C:\laragon\bin\mysql\mysql-8.4.3-winx64\my.ini"

echo ========================================
echo Undangan Local Launcher
echo ========================================

netstat -ano | findstr ":3306" >nul
if errorlevel 1 (
    echo [1/3] Menyalakan MySQL Laragon...
    start "Undangan MySQL" "%MYSQLD%" --defaults-file="%MYSQL_INI%"
) else (
    echo [1/3] MySQL sudah aktif di port 3306.
)

netstat -ano | findstr ":8000" >nul
if errorlevel 1 (
    echo [2/3] Menyalakan backend lokal...
    start "Undangan Backend" cmd /k "cd /d ""%ROOT%backend"" && php saya coba"
) else (
    echo [2/3] Backend sudah aktif di port 8000.
)

netstat -ano | findstr ":8081" >nul
if errorlevel 1 (
    echo [3/3] Menyalakan frontend lokal...
    start "Undangan Frontend" cmd /k "cd /d ""%ROOT%"" && npm run dev:local"
) else (
    echo [3/3] Frontend sudah aktif di port 8081.
)

echo.
echo URL penting:
echo - Undangan : http://127.0.0.1:8081/index.html
echo - Dashboard: http://127.0.0.1:8081/dashboard.html
echo - Backend  : http://localhost:8000/api/health
echo.
echo Login dashboard:
echo - Email   : admin@studio.com
echo - Password: Studio2026!
echo.
echo Biarkan jendela backend dan frontend tetap terbuka saat dipakai.
pause
