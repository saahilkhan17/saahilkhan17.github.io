@echo off
title Me cleaner
cd /d "%~dp0"

set "self=%~nx0"

call :m Videos mp4 mkv avi mov wmv flv webm 3gp
call :m Photos jpg jpeg png gif bmp webp heic svg
call :m Documents pdf doc docx xls xlsx csv ppt pptx
call :m "Txt Files" txt
call :m Music mp3 wav aac flac m4a ogg
call :m Zip zip rar 7z tar gz
call :m Apps exe msi apk

for %%f in (*) do (
    if /i not "%%~nxf"=="%self%" (
        if /i not "%%~xf"==".crdownload" (
            if /i not "%%~xf"==".part" (
                if /i not "%%~xf"==".tmp" (
                    if not exist "Others" md "Others"
                    if not exist "Others\%%~nxf" move "%%f" "Others\" >nul
                )
            )
        )
    )
)

echo.
echo Done! Your folder has been organized.
pause
exit /b

:m
set "d=%~1"
shift

:n
if "%~1"=="" exit /b

if exist "*.%~1" (
    if not exist "%d%" md "%d%"
    for %%f in ("*.%~1") do (
        if exist "%%~f" (
            if not exist "%d%\%%~nxf" move "%%~f" "%d%\" >nul
        )
    )
)

shift
goto n
