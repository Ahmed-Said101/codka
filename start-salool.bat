@echo off
setlocal
cd /d "%~dp0"

rem Haddii server-ku hore u ordayo, bogga oo kaliya ayaa la furayaa.
set "FOUND="
for %%P in (4176 4177 4178 4179 4180) do (
  if not defined FOUND (
    curl -s -m 2 "http://127.0.0.1:%%P/api/status" 2>nul | findstr /c:"somaliModel" >nul && set "FOUND=%%P"
  )
)

if not defined FOUND (
  set "PORT=4176"
  start "Salool codka" /min cmd /c "node --env-file=.env.local voice-server.js > voice-server.log 2>&1" >nul 2>&1
  rem ping wuxuu shaqeeyaa console la'aan; timeout ma shaqeeyo halkan.
  for /L %%I in (1,1,10) do (
    if not defined FOUND (
      ping -n 2 127.0.0.1 >nul
      for %%P in (4176 4177 4178 4179 4180) do (
        if not defined FOUND (
          curl -s -m 2 "http://127.0.0.1:%%P/api/status" 2>nul | findstr /c:"somaliModel" >nul && set "FOUND=%%P"
        )
      )
    )
  )
)

if not defined FOUND (
  echo Server-ku ma bilaaban. Hubi in Node.js rakiban yahay: node -v
  pause
  exit /b 1
)

start "" "http://127.0.0.1:%FOUND%/call.html" >nul 2>&1
endlocal
