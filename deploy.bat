@echo off
chcp 65001 >nul

echo 🎮 Retro Gaming Store Deployment Script
echo ========================================

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

REM Check if we're in a git repository
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
)

REM Ask for GitHub username
set /p GITHUB_USERNAME="Enter your GitHub username: "

REM Ask for repository name
set /p REPO_NAME="Enter your repository name (default: retro-gaming-store): "
if "%REPO_NAME%"=="" set REPO_NAME=retro-gaming-store

REM Ask for deployment option
echo.
echo Choose your deployment option:
echo 1) Frontend Only (GitHub Pages) + Local Backend (Recommended for development)
echo 2) Full Deployment (GitHub Pages + Cloud Backend)
set /p DEPLOY_OPTION="Enter your choice (1 or 2): "

REM Add all files
echo 📦 Adding files to Git...
git add .

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "Initial commit: Retro Gaming Store"

REM Add remote repository
echo 🔗 Adding GitHub remote...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo.
echo 📋 Next Steps:
echo 1. Go to https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo 2. Click 'Settings' tab
echo 3. Scroll down to 'Pages' section
echo 4. Under 'Source', select 'GitHub Actions'
echo 5. The workflow will automatically deploy when you push to main
echo.

if "%DEPLOY_OPTION%"=="2" (
    echo 🌐 For full deployment, you'll need to:
    echo 1. Deploy your backend to Railway, Render, or Heroku
    echo 2. Update the API_BASE_URL in your frontend files
    echo 3. Push the changes to GitHub
    echo.
    echo 📖 See DEPLOYMENT.md for detailed instructions
)

echo 🎉 Your Retro Gaming Store will be available at:
echo https://%GITHUB_USERNAME%.github.io/%REPO_NAME%
echo.
echo Happy coding! 🎮✨
pause 