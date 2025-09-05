# Frontend - Satyasri Computers Ticket Management

This is the frontend React application for the Satyasri Computers service center ticket management system.

## Getting Started

### Prerequisites
- Node.js 18+

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the frontend root:
```bash
# For local development
VITE_API_URL=http://localhost:5000

# For production (replace with your Render backend URL)
# VITE_API_URL=https://your-backend-app.onrender.com
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## Deployment to Netlify

### Method 1: Git Integration (Recommended)
1. **Push your code** to GitHub/GitLab/Bitbucket
2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your repository
3. **Configure build settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. **Set environment variables:**
   - Go to Site settings → Environment variables
   - Add `VITE_API_URL` with your Render backend URL
5. **Deploy!** Netlify will auto-deploy on every push

### Method 2: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

## Configuration

### Backend URL Configuration
The app uses environment variables to determine the backend URL:

- **Development:** Uses `http://localhost:5000`
- **Production:** Uses `VITE_API_URL` environment variable

Update `.env` file or Netlify environment variables to point to your deployed backend.

## Features

- **Dashboard** - Overview of tickets and system status
- **Ticket Management** - Create, view, and update service tickets
- **Customer Management** - Manage customer information
- **User Authentication** - Role-based access (frontdesk/technician)
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** for components
- **TanStack Query** for API state management
- **Wouter** for routing