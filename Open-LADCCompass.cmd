@echo off
setlocal

cd /d "%~dp0"

set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "NEXT_BIN=%~dp0node_modules\next\dist\bin\next"
set "APP_URL=http://127.0.0.1:3000"
set "LOG_FILE=%~dp0ladc-compass-server.log"

if not exist "%NODE_EXE%" (
  echo Could not find the bundled Node.js runtime.
  echo If you have Node.js installed, open this folder in a terminal and run: npm run start
  pause
  exit /b 1
)

if not exist "%NEXT_BIN%" (
  echo LADC Compass dependencies were not found.
  echo The node_modules folder is missing or incomplete.
  pause
  exit /b 1
)

echo Starting LADC Compass...
echo.
echo Leave this window open while using the portal.
echo Wait until you see "Ready", then use the address below.
echo.
echo   %APP_URL%
echo.

if exist "%LOG_FILE%" del "%LOG_FILE%"

start "" "%APP_URL%"
"%NODE_EXE%" "%NEXT_BIN%" start -H 127.0.0.1 -p 3000

echo.
echo LADC Compass stopped. If you saw an error above, send me a screenshot or paste the message.
pause
