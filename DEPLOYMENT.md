# 🚀 Deployment Guide - Retro Gaming Store

This guide will help you deploy the Retro Gaming Store to Railway.

## 📋 Prerequisites

- GitHub account
- Railway account (free tier available)
- Git installed on your computer
- Python 3.8+ installed

## 🎯 Deployment Overview

This project is designed to be deployed as a full-stack application on Railway, which provides:
- **Backend**: Django REST API
- **Database**: PostgreSQL
- **Frontend**: Django templates served by Django
- **Static Files**: Served by WhiteNoise middleware

## 🚀 Step 1: Prepare Your Repository

### 1.1 Create a new GitHub repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `retro-gaming-store`
3. Make it public or private (your choice)
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

## 🚂 Step 2: Deploy to Railway

### 2.1 Sign up for Railway

1. Go to [railway.app](https://railway.app/)
2. Sign up with your GitHub account
3. Railway will automatically connect to your GitHub repositories

### 2.2 Deploy your project

1. **Click "New Project"** in Railway dashboard
2. **Select "Deploy from GitHub repo"**
3. **Choose your repository** (`retro-gaming-store`)
4. **Railway will automatically detect Django** and start deploying

### 2.3 Configure environment variables

Railway will automatically set up most environment variables, but you can customize them:

1. Go to your project settings in Railway
2. Click on "Variables" tab
3. Add or modify these variables:

```
DEBUG=False
ALLOWED_HOSTS=your-app-name.railway.app,*.railway.app
SECRET_KEY=your-secret-key-here
```

### 2.4 Add PostgreSQL database

1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically connect it to your Django app
4. The `DATABASE_URL` will be automatically set

## 🔧 Step 3: Configuration Files

Your project already includes the necessary Railway configuration files:

### `railway.json`
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python manage.py collectstatic --noinput && python manage.py migrate && python manage.py seed_consoles && gunicorn retrostore.wsgi:application",
    "healthcheckPath": "/health/",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### `railway.toml`
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "python manage.py collectstatic --noinput && python manage.py migrate && python manage.py seed_consoles && gunicorn retrostore.wsgi:application"
healthcheckPath = "/health/"
healthcheckTimeout = 300

[deploy.envs]
DEBUG = "False"
ALLOWED_HOSTS = "*.railway.app"
```

### `requirements.txt`
```
Django==5.2.4
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.0
django-cors-headers==4.3.1
drf-spectacular==0.27.0
gunicorn==21.2.0
whitenoise==6.6.0
psycopg2-binary==2.9.9
dj-database-url==2.1.0
setuptools==69.0.3
```

### `runtime.txt`
```
python-3.11.9
```

## 🚀 Step 4: Monitor Deployment

### 4.1 Check deployment status

1. **Go to your Railway project dashboard**
2. **Check the "Deployments" tab** for build status
3. **Monitor logs** for any errors
4. **Wait for deployment to complete**

### 4.2 Verify your deployment

Once deployed, your site will be available at:
`https://your-app-name.railway.app`

You should see:
- ✅ Homepage with featured products
- ✅ Products page with all consoles
- ✅ Working authentication
- ✅ Functional cart and checkout
- ✅ Admin panel at `/admin/`

## 🔧 Step 5: Post-Deployment Setup

### 5.1 Create admin user

1. Go to your Railway project dashboard
2. Click on "Deployments" → "Latest deployment"
3. Click "View logs" and find the terminal
4. Run these commands:

```bash
# Create admin user
python manage.py createsuperuser

# Seed the database with products
python manage.py seed_consoles
```

### 5.2 Test your site

1. **Homepage**: Should load with featured products
2. **Products page**: Should display all products
3. **Authentication**: Register/login should work
4. **Cart/Checkout**: Full e-commerce flow
5. **Admin panel**: Access at `/admin/`

## 🔧 Troubleshooting

### Common Issues:

**1. Build Failures**
- Check that all dependencies are in `requirements.txt`
- Verify Python version in `runtime.txt`
- Check Railway logs for specific error messages

**2. Database Connection Issues**
- Ensure PostgreSQL is added to your project
- Check that `DATABASE_URL` is set correctly
- Verify migrations are running during deployment

**3. Static Files Not Loading**
- Ensure `collectstatic` is running during deployment
- Check that WhiteNoise is configured in `settings.py`
- Verify static files are being served correctly

**4. CORS Issues**
- Check that `ALLOWED_HOSTS` includes your Railway domain
- Verify CORS settings in `settings.py`

### Debug Steps:

1. **Check Railway logs** in your project dashboard
2. **Verify environment variables** are set correctly
3. **Test API endpoints** directly in browser
4. **Check database connectivity** through Railway dashboard

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Django Deployment Guide](https://docs.djangoproject.com/en/5.2/howto/deployment/)
- [PostgreSQL on Railway](https://docs.railway.app/databases/postgresql)

## 🎉 Success!

Once deployed, your Retro Gaming Store will be live at:
`https://your-app-name.railway.app`

**Features available:**
- ✅ Full e-commerce functionality
- ✅ User authentication and profiles
- ✅ Product catalog with ratings
- ✅ Shopping cart and checkout
- ✅ Order management
- ✅ Admin panel for management

Share your site with others and enjoy your fully functional e-commerce platform! 🎮✨ 