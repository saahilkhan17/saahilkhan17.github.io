@echo off
setlocal
title PC Cleaner
color 0B

echo ==========================================
echo              PC CLEANER
echo ==========================================
echo.
echo This tool removes temporary files from:
echo   - Your Windows user TEMP folder
echo   - The Windows TEMP folder (if permitted)
echo.
echo Files currently in use will be skipped.
echo Your personal documents, downloads and photos
echo will NOT be intentionally deleted.
echo.
choice /C YN /N /M "Continue with cleanup? (Y/N): "
if errorlevel 2 goto cancelled

echo.
echo [1/2] Cleaning your user TEMP folder...
call :CleanFolder "%TEMP%"

echo.
echo [2/2] Cleaning Windows TEMP folder...
if defined SystemRoot call :CleanFolder "%SystemRoot%\Temp"

echo.
echo ==========================================
echo Cleanup finished.
echo Some files may remain because Windows or
echo another application is currently using them.
echo ==========================================
goto end

:CleanFolder
set "TARGET=%~1"
if not exist "%TARGET%\" (
    echo Folder not found: "%TARGET%"
    exit /b
)
del /f /q "%TARGET%\*" >nul 2>&1
for /d %%D in ("%TARGET%\*") do rd /s /q "%%~fD" >nul 2>&1
echo Finished: "%TARGET%"
exit /b

:cancelled
echo.
echo Cleanup cancelled. No files were changed.

:end
echo.
pause
endlocal
