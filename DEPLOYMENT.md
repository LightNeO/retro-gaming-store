# 🚀 Deployment Guide - Retro Gaming Store

This guide will help you deploy the Retro Gaming Store to GitHub Pages and set up the backend.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Python 3.8+ installed

## 🎯 Deployment Options

### Option 1: Frontend Only (GitHub Pages) + Local Backend
- **Frontend**: Deployed to GitHub Pages (free)
- **Backend**: Run locally for development/testing

### Option 2: Full Deployment
- **Frontend**: GitHub Pages
- **Backend**: Cloud service (Railway, Render, Heroku)

## 🚀 Step 1: Prepare Your Repository

### 1.1 Create a new GitHub repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `retro-gaming-store`
3. Make it public (required for GitHub Pages)
4. Don't initialize with README (we'll push our existing code)

### 1.2 Push your code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Retro Gaming Store"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/retro-gaming-store.git

# Push to GitHub
git push -u origin main
```

## 🎨 Step 2: Configure Frontend for GitHub Pages

### 2.1 Update API Base URL

Before deploying, you need to update the API base URL in your frontend files. The current configuration automatically detects localhost vs production:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://127.0.0.1:8000/api' 
    : 'https://your-backend-url.com/api'; // Update this!
```

**For Option 1 (Local Backend):**
- Keep the current configuration
- Users will need to run the backend locally

**For Option 2 (Cloud Backend):**
- Replace `'https://your-backend-url.com/api'` with your actual backend URL

### 2.2 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy when you push to main

## 🔧 Step 3: Backend Deployment Options

### Option 3A: Local Backend (Recommended for Development)

Keep the backend running locally for development and testing:

```bash
# Activate virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Seed the database
python manage.py seed_consoles

# Start the server
python manage.py runserver
```

**Pros:**
- ✅ Free
- ✅ Full control
- ✅ Easy debugging
- ✅ No configuration needed

**Cons:**
- ❌ Not accessible to others
- ❌ Requires local setup

### Option 3B: Railway Deployment (Recommended for Production)

[Railway](https://railway.app/) offers free hosting for Django apps:

1. **Sign up** at [railway.app](https://railway.app/)
2. **Connect your GitHub repository**
3. **Create a new project** from your repository
4. **Add environment variables:**
   ```
   DEBUG=False
   ALLOWED_HOSTS=your-app-name.railway.app
   DATABASE_URL=postgresql://... (Railway will provide this)
   ```
5. **Deploy** - Railway will automatically detect Django and deploy

### Option 3C: Render Deployment

[Render](https://render.com/) also offers free Django hosting:

1. **Sign up** at [render.com](https://render.com/)
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn retrostore.wsgi:application`
5. **Add environment variables** (same as Railway)
6. **Deploy**

### Option 3D: Heroku Deployment

[Heroku](https://heroku.com/) (requires credit card for verification):

1. **Sign up** at [heroku.com](https://heroku.com/)
2. **Install Heroku CLI**
3. **Create app**: `heroku create your-app-name`
4. **Add PostgreSQL**: `heroku addons:create heroku-postgresql:mini`
5. **Deploy**: `git push heroku main`
6. **Run migrations**: `heroku run python manage.py migrate`

## 🔄 Step 4: Update Frontend API URL

Once your backend is deployed, update the API base URL in your frontend files:

### Update these files:
- `frontend/templates/index.html`
- `frontend/templates/products.html`
- `frontend/templates/product.html`
- `frontend/templates/cart.html`
- `frontend/templates/checkout.html`
- `frontend/templates/profile.html`
- `frontend/templates/login.html`
- `frontend/templates/register.html`

Replace:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://127.0.0.1:8000/api' 
    : 'https://your-backend-url.com/api';
```

With your actual backend URL:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://127.0.0.1:8000/api' 
    : 'https://your-app-name.railway.app/api'; // Your actual backend URL
```

## 🚀 Step 5: Deploy and Test

### 5.1 Push Changes

```bash
git add .
git commit -m "Update API URLs for deployment"
git push origin main
```

### 5.2 Monitor Deployment

1. **Check GitHub Actions** in your repository
2. **Wait for deployment** to complete
3. **Visit your site** at `https://YOUR_USERNAME.github.io/retro-gaming-store`

### 5.3 Test Your Site

1. **Homepage**: Should load with featured products
2. **Products page**: Should display all products
3. **Product details**: Should show individual products
4. **Authentication**: Register/login should work
5. **Cart/Checkout**: Full e-commerce flow

## 🔧 Troubleshooting

### Common Issues:

**1. CORS Errors**
- Ensure your backend has proper CORS settings
- Check that `ALLOWED_HOSTS` includes your GitHub Pages domain

**2. API Connection Errors**
- Verify the API base URL is correct
- Check that your backend is running and accessible

**3. Static Files Not Loading**
- Ensure images are in the correct location
- Check that `collectstatic` was run during deployment

**4. Database Issues**
- Run migrations on your deployed backend
- Seed the database with products

### Debug Steps:

1. **Check browser console** for JavaScript errors
2. **Check network tab** for failed API requests
3. **Verify backend logs** for server errors
4. **Test API endpoints** directly in browser

## 📚 Additional Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Django Deployment Guide](https://docs.djangoproject.com/en/5.2/howto/deployment/)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)

## 🎉 Success!

Once deployed, your Retro Gaming Store will be live at:
- **Frontend**: `https://YOUR_USERNAME.github.io/retro-gaming-store`
- **Backend**: `https://your-backend-url.com/api`

Share your site with others and enjoy your fully functional e-commerce platform! 🎮✨ 