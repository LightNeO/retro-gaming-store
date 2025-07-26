# 🚀 Railway Deployment Guide - Retro Gaming Store Backend

This guide will help you deploy your Django backend to Railway for free!

## 📋 Prerequisites

- GitHub account (you already have this)
- Railway account (free)

## 🎯 Step-by-Step Deployment

### Step 1: Sign up for Railway

1. **Go to [railway.app](https://railway.app/)**
2. **Click "Start a New Project"**
3. **Sign up with your GitHub account**
4. **Authorize Railway to access your repositories**

### Step 2: Deploy Your Repository

1. **Click "Deploy from GitHub repo"**
2. **Select your repository**: `LightNeO/retro-gaming-store`
3. **Railway will automatically detect it's a Django project**
4. **Click "Deploy Now"**

### Step 3: Configure Environment Variables

Railway will automatically add these, but you can verify them in the **Variables** tab:

```
DEBUG=False
ALLOWED_HOSTS=your-app-name.railway.app
DATABASE_URL=postgresql://... (Railway will provide this)
```

### Step 4: Get Your Backend URL

1. **Go to the "Deployments" tab**
2. **Click on your latest deployment**
3. **Copy the generated URL** (e.g., `https://your-app-name.railway.app`)

### Step 5: Update Frontend Configuration

1. **Go to your GitHub repository**: https://github.com/LightNeO/retro-gaming-store
2. **Edit the file**: `frontend/templates/config.js`
3. **Update the PROD_API_URL** with your Railway URL:

```javascript
const CONFIG = {
    // Development backend (local)
    DEV_API_URL: 'http://127.0.0.1:8000/api',
    
    // Production backend (update this with your actual Railway URL)
    PROD_API_URL: 'https://your-app-name.railway.app/api', // ← Update this!
    
    // Auto-detect environment
    get API_BASE_URL() {
        const hostname = window.location.hostname;
        const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
        return isLocal ? this.DEV_API_URL : this.PROD_API_URL;
    }
};
```

### Step 6: Push the Updated Configuration

```bash
git add .
git commit -m "Update API URL for Railway backend"
git push retro-store main
```

### Step 7: Test Your Deployment

1. **Wait 2-3 minutes** for Railway to deploy
2. **Test your backend API**: `https://your-app-name.railway.app/api/products/`
3. **Test your frontend**: https://lightneo.github.io/retro-gaming-store

## 🎉 What You'll Have

- ✅ **Backend**: Live on Railway (accessible to everyone)
- ✅ **Frontend**: Live on GitHub Pages
- ✅ **Database**: PostgreSQL (provided by Railway)
- ✅ **Full E-commerce**: Complete functionality for all users

## 🔧 Railway Features

### Automatic Deployments
- Every push to main triggers a new deployment
- Automatic database migrations
- Health checks ensure your app is running

### Free Tier Includes
- 500 hours/month of runtime
- PostgreSQL database
- Custom domains
- SSL certificates

### Monitoring
- View logs in real-time
- Monitor performance
- Set up alerts

## 🚨 Troubleshooting

### Common Issues:

**1. Build Fails**
- Check the logs in Railway dashboard
- Ensure all dependencies are in `requirements.txt`
- Verify `railway.json` configuration

**2. Database Connection Issues**
- Railway automatically provides `DATABASE_URL`
- Check that `dj-database-url` is in requirements.txt
- Verify migrations run successfully

**3. CORS Errors**
- Frontend can't connect to backend
- Check that `ALLOWED_HOSTS` includes your Railway domain
- Verify CORS settings in Django

**4. Static Files Not Loading**
- Railway serves static files automatically
- Check that `STATIC_ROOT` is configured correctly

### Debug Steps:

1. **Check Railway logs** in the dashboard
2. **Test API endpoints** directly in browser
3. **Verify environment variables** are set correctly
4. **Check database migrations** ran successfully

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Django on Railway](https://docs.railway.app/deploy/deployments/python)
- [PostgreSQL on Railway](https://docs.railway.app/databases/postgresql)

## 🎮 Your Live URLs

Once deployed:
- **Frontend**: https://lightneo.github.io/retro-gaming-store
- **Backend API**: https://your-app-name.railway.app/api
- **Admin Panel**: https://your-app-name.railway.app/admin

**Your Retro Gaming Store will be fully functional for everyone on the internet!** 🌐✨ 