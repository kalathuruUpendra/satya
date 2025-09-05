# Backend - Satyasri Computers Ticket Management

This is the backend API for the Satyasri Computers service center ticket management system.

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the backend root:
```bash
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

### Database Setup
```bash
# Push database schema
npm run db:push
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## Deployment to Render

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `NODE_ENV`: `production`

4. **Auto-deploy** will be enabled for pushes to main branch

## API Endpoints

- `GET /health` - Health check
- `POST /api/auth/login` - User authentication
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create new customer

## CORS Configuration

The backend is configured to accept requests from:
- `localhost:3000` (local frontend dev)
- `localhost:5173` (Vite dev server)
- `*.netlify.app` (Netlify deployments)
- `*.app.netlify.com` (Netlify previews)