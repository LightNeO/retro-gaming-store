#!/bin/bash

# 🚀 Retro Gaming Store Deployment Script
# This script helps you deploy your Retro Gaming Store to GitHub Pages

echo "🎮 Retro Gaming Store Deployment Script"
echo "========================================"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Ask for GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Ask for repository name
read -p "Enter your repository name (default: retro-gaming-store): " REPO_NAME
REPO_NAME=${REPO_NAME:-retro-gaming-store}

# Ask for deployment option
echo ""
echo "Choose your deployment option:"
echo "1) Frontend Only (GitHub Pages) + Local Backend (Recommended for development)"
echo "2) Full Deployment (GitHub Pages + Cloud Backend)"
read -p "Enter your choice (1 or 2): " DEPLOY_OPTION

# Add all files
echo "📦 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Retro Gaming Store"

# Add remote repository
echo "🔗 Adding GitHub remote..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "2. Click 'Settings' tab"
echo "3. Scroll down to 'Pages' section"
echo "4. Under 'Source', select 'GitHub Actions'"
echo "5. The workflow will automatically deploy when you push to main"
echo ""

if [ "$DEPLOY_OPTION" = "2" ]; then
    echo "🌐 For full deployment, you'll need to:"
    echo "1. Deploy your backend to Railway, Render, or Heroku"
    echo "2. Update the API_BASE_URL in your frontend files"
    echo "3. Push the changes to GitHub"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
fi

echo "🎉 Your Retro Gaming Store will be available at:"
echo "https://$GITHUB_USERNAME.github.io/$REPO_NAME"
echo ""
echo "Happy coding! 🎮✨" 