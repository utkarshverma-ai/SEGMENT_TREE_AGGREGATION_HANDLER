# Vercel Deployment Guide

This document provides step-by-step instructions for deploying the Segment Tree Aggregation Handler to Vercel.

## Prerequisites

1. [Vercel CLI](https://vercel.com/docs/cli) installed: `npm install -g vercel`
2. A [Vercel account](https://vercel.com/signup)
3. A [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) for database hosting
4. Git repository (push to GitHub)

## Deployment Steps

### Step 1: Prepare MongoDB

1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user with password
4. Whitelist your IP address (or allow 0.0.0.0 for Vercel)
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

### Step 2: Push to Git Repository

Ensure your code is committed and pushed to GitHub (or GitLab/Bitbucket):

```bash
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

### Step 3: Deploy Using Vercel CLI

```bash
# Log in to Vercel
vercel login

# Deploy the project
vercel --prod
```

Or deploy directly from the [Vercel Dashboard](https://vercel.com/new):

1. Go to https://vercel.com/new
2. Import your Git repository
3. Select the project root directory
4. Click "Deploy"

### Step 4: Configure Environment Variables

After deployment (or in the Vercel Dashboard):

1. Go to Settings → Environment Variables
2. Add these variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
   - `PORT`: `3000`

### Step 5: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the API endpoints:
   - `GET /api/state` - Get current array state
   - `GET /api/sum?l=0&r=5` - Test range sum query
   - `POST /api/array` - Test setting array

## Project Structure for Vercel

```
.
├── api/
│   └── index.js          # Serverless function entry point
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
├── vercel.json           # Vercel configuration
├── .vercelignore         # Files to ignore
└── package.json          # Root package.json
```

## How Deployment Works

- **Frontend**: Built with Vite and served as static assets from the `/frontend/dist` folder
- **Backend API**: Runs as Serverless Functions from `/api` directory
- **Database**: Connected via MongoDB URI environment variable
- **Rewrites**: API requests to `/api/*` are routed to the serverless functions
- **SSR**: Non-API requests are rewritten to `/index.html` for React routing

## Troubleshooting

### Build Fails
- Ensure all dependencies are listed in `backend/package.json` and `frontend/package.json`
- Check that environment variables are set in Vercel dashboard
- Verify MongoDB connection string is correct

### API Errors After Deployment
- Check Vercel logs: `vercel logs` or use the dashboard
- Verify MongoDB Atlas allows Vercel IPs (use 0.0.0.0 for testing)
- Ensure async initialization completes before requests are handled

### Frontend Can't Connect to API
- Verify `VITE_API_BASE_URL` is set to `/api` in production
- Check that the frontend API client uses relative paths
- Verify CORS is configured in your Express app

## Monitoring and Debugging

View real-time logs:
```bash
vercel logs --follow
```

## Rollback

If you need to rollback to a previous deployment:
```bash
vercel rollback
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel MySQL Guide](https://vercel.com/docs/storage/vercel-postgres)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
