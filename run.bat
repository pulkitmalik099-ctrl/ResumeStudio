@echo off
REM Resume Studio - Development Server Launcher
REM This script sets up the environment and runs the development server

echo.
echo ╔══════════════════════════════════════════╗
echo ║    Resume Studio - Development Server    ║
echo ╚══════════════════════════════════════════╝
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] node_modules not found. Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [SUCCESS] Dependencies installed
    echo.
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo [WARNING] .env.local not found
    echo [INFO] Copying from .env.local.example...
    if exist ".env.local.example" (
        copy ".env.local.example" ".env.local"
        echo [SUCCESS] Created .env.local - Please update with your settings
        echo.
        echo Important: Update these in .env.local:
        echo   - DATABASE_URL: Your PostgreSQL connection string
        echo   - NEXTAUTH_SECRET: Run 'openssl rand -base64 32'
        echo   - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET (optional)
        echo.
        echo Exiting... Please configure .env.local and run this script again.
        pause
        exit /b 1
    ) else (
        echo [ERROR] .env.local.example not found
        pause
        exit /b 1
    )
)

REM Check if Prisma migrations are up to date
echo [INFO] Checking database...
call npx prisma db push --skip-generate
if errorlevel 1 (
    echo [WARNING] Database setup encountered an issue
    echo [INFO] Make sure your DATABASE_URL in .env.local is correct
    echo.
)

echo.
echo [INFO] Starting development server on http://localhost:3000
echo [INFO] Press Ctrl+C to stop the server
echo.

REM Start the dev server
call npm run dev

if errorlevel 1 (
    echo.
    echo [ERROR] Failed to start development server
    pause
    exit /b 1
)
