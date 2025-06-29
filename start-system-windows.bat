@echo off
echo Starting HR System...
echo.

REM Start Backend Server
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm start"

REM Wait 5 seconds for backend to start
timeout /t 5 /nobreak

REM Start Frontend Server  
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5001
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause 