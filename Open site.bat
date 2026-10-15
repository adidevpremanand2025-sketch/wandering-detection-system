@echo off
rem Opens the Wandering Detection site in your browser. Double-click this file.
rem It builds the site first if there is no build yet, then serves it locally.
cd /d "%~dp0"

if not exist node_modules (
  echo Installing dependencies, one moment...
  call npm install
)
if not exist dist\index.html (
  echo Building the site...
  call npm run build
)

echo.
echo Opening http://localhost:4173/  -  close this window to stop the site.
start "" http://localhost:4173/
call npx vite preview --port 4173 --strictPort
pause
