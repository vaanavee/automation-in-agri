@echo off
echo Starting Backend Server...
start cmd /k "cd backend && .\venv\Scripts\python -m uvicorn main:app --reload --port 8000"

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo DO YOU WANT TO CONNECT THE ARDUINO SIMULATOR NOW?
echo ========================================================
echo If your Arduino simulation is running and connected to a COM port,
echo please enter the COM port (e.g., COM3).
echo If you don't want to connect it right now, just press Enter to skip.
echo.
set /p COMPORT="Enter COM port (or press Enter to skip): "

if NOT "%COMPORT%"=="" (
    echo Starting Arduino Serial Bridge on %COMPORT%...
    start cmd /k "cd backend && .\venv\Scripts\python serial_bridge.py %COMPORT%"
) else (
    echo Skipping Arduino Serial Bridge. 
    echo You can start it later by running: python serial_bridge.py [COM_PORT] in the backend folder.
)

echo.
echo Both servers are starting in separate windows!
