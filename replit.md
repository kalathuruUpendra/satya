# Overview

This is a ticket management system designed for "Satyasri Computers" service center. The application manages customers, service requests, and invoices for computer repair services. The project has been restructured for separate deployment: **frontend to Netlify** and **backend to Render**.

# User Preferences

Preferred communication style: Simple, everyday language.
Deployment preference: Separate frontend (Netlify) and backend (Render) deployments.

# Project Structure

The project is now split into two independent applications:

## Frontend (`/frontend`)
- **Framework**: React with TypeScript and Vite
- **Deployment Target**: Netlify
- **API Communication**: Uses environment variables (`VITE_API_URL`) to connect to backend
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with responsive design

## Backend (`/backend`) 
- **Framework**: Express.js with TypeScript
- **Deployment Target**: Render
- **Database**: PostgreSQL with Neon serverless hosting
- **CORS**: Configured for Netlify domains and localhost
- **Authentication**: JWT-based with role-based access (frontdesk/technician)
- **API Design**: RESTful endpoints for tickets, customers, and users

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript and Vite for development tooling
- **Routing**: Wouter for client-side routing with pages for dashboard, customers, service requests, and invoices
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **API Configuration**: Environment-based URL configuration for development and production

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Database ORM**: Drizzle ORM for type-safe database operations and migrations
- **API Design**: RESTful endpoints for CRUD operations on customers, service requests, and invoices
- **Request Logging**: Custom middleware for API request/response logging with performance metrics
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **CORS Middleware**: Configured for cross-origin requests from Netlify deployments

## Data Storage
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema Design**: Three main entities (customers, service requests, invoices) with proper foreign key relationships
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Connection**: Connection pooling using Neon's serverless PostgreSQL client

## Development Setup
- **Build System**: Vite for frontend bundling and esbuild for backend compilation
- **Development Server**: Separate dev servers for frontend and backend
- **File Structure**: Shared schema definitions between frontend and backend using path aliases
- **TypeScript**: Strict mode enabled with proper path mapping for clean imports

# Deployment Configuration

## Frontend (Netlify)
- **Build Command**: `npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment Variables**: `VITE_API_URL` pointing to Render backend
- **Auto-deploy**: Enabled for main branch pushes

## Backend (Render)
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables**: `DATABASE_URL`, `NODE_ENV=production`
- **Auto-deploy**: Enabled for main branch pushes

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production database
- **Drizzle ORM**: Database toolkit for TypeScript with schema management

## UI and Styling
- **Radix UI**: Headless component primitives for accessibility and behavior
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Frontend build tool and development server
- **TanStack Query**: Server state management and data fetching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation for form data and API responses

## Deployment Platforms
- **Netlify**: Frontend hosting with CDN and automatic deployments
- **Render**: Backend hosting with automatic builds and SSL
- **Neon**: Serverless PostgreSQL database hosting

# Recent Changes (September 2025)

## Project Restructuring
- Separated single full-stack app into independent frontend and backend applications
- Configured CORS middleware for cross-origin communication
- Set up environment-based API URL configuration for deployment flexibility
- Created comprehensive deployment documentation for Netlify and Render

## API Communication
- Frontend uses `VITE_API_URL` environment variable to determine backend URL
- Backend accepts requests from Netlify domains and localhost
- JWT authentication maintained across separate deployments
- Proper error handling for cross-origin requests

## Deployment Preparation
- Created README files for both frontend and backend with deployment instructions
- Set up build configurations for Netlify and Render
- Documented environment variable requirements for both platforms
- Prepared migration path from monolithic to microservice architecture