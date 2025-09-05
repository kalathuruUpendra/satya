# Deployment Guide - Satyasri Computers Ticket Management

This guide walks you through deploying the ticket management system with **frontend on Netlify** and **backend on Render**.

## Overview

- **Frontend**: React app deployed to Netlify
- **Backend**: Express.js API deployed to Render  
- **Database**: PostgreSQL (Neon recommended)
- **Communication**: Frontend uses environment variables to connect to backend

## Step 1: Database Setup (Neon)

1. **Create account** at [neon.tech](https://neon.tech)
2. **Create a new project** and database
3. **Copy the connection string** (starts with `postgresql://`)
4. **Save it** - you'll need this for backend deployment

## Step 2: Backend Deployment (Render)

1. **Create Render account** at [render.com](https://render.com)
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure the service:**
   ```
   Name: satyasri-backend (or your choice)
   Root Directory: backend
   Build Command: npm install && npm run build
   Start Command: npm start
   ```
5. **Set environment variables:**
   ```
   DATABASE_URL: [your Neon connection string]
   NODE_ENV: production
   ```
6. **Deploy** - Render will build and start your backend
7. **Note the URL** - it will be something like `https://satyasri-backend.onrender.com`

## Step 3: Frontend Deployment (Netlify)

### Option A: Git Integration (Recommended)

1. **Push code to GitHub** (if not already done)
2. **Create Netlify account** at [netlify.com](https://netlify.com)
3. **Click "New site from Git"**
4. **Connect your repository**
5. **Configure build settings:**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```
6. **Set environment variables:**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com`
7. **Deploy!**

### Option B: Manual Deploy

```bash
# Navigate to frontend directory
cd frontend

# Set production API URL
echo "VITE_API_URL=https://your-backend-url.onrender.com" > .env

# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## Step 4: Verification

1. **Check backend health:**
   ```
   GET https://your-backend-url.onrender.com/health
   ```

2. **Test frontend:**
   - Visit your Netlify URL
   - Try logging in
   - Create a test ticket

3. **Check browser console** for any connection errors

## Environment Variables Summary

### Backend (.env)
```bash
DATABASE_URL=postgresql://username:password@host/database
NODE_ENV=production
PORT=5000
```

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url.onrender.com
```

## Common Issues & Solutions

### CORS Errors
- Backend is configured for `*.netlify.app` domains
- If using custom domain, update CORS settings in `backend/server/index.ts`

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check Neon database is running
- Ensure database schema is pushed: `npm run db:push`

### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` environment variable
- Check backend health endpoint
- Ensure backend is deployed and running

## Free Tier Considerations

- **Render Free Tier**: App sleeps after 15 minutes of inactivity
- **Netlify Free Tier**: 100GB bandwidth, 300 build minutes
- **Neon Free Tier**: 3GB storage, 1 database

For production use, consider upgrading to paid tiers for better performance and reliability.

## Support

For deployment issues:
- **Render**: [render.com/docs](https://render.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **Neon**: [neon.tech/docs](https://neon.tech/docs)