import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { seedDefaultUsers } from "./seed";

const app = express();

// -----------------------
// CORS middleware - allow everyone
// -----------------------
app.use((req, res, next) => {
  const origin = req.headers.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

// -----------------------
// Body parsing
// -----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// -----------------------
// Logging middleware
// -----------------------
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      console.log(logLine);
    }
  });

  next();
});

// -----------------------
// Safe seeding guard
// -----------------------
let seeded = false;
async function safeSeedDefaultUsers() {
  if (!seeded) {
    await seedDefaultUsers();
    seeded = true;
    console.log("✅ Default users seeded once");
  }
}

// -----------------------
// Main startup function
// -----------------------
async function startServer() {
  try {
    // 1️⃣ Seed default users
    await safeSeedDefaultUsers();

    // 2️⃣ Register routes
    await registerRoutes(app);

    // 3️⃣ Health check
    app.get("/health", (_req, res) => {
      res.json({ status: "ok", timestamp: new Date().toISOString() });
    });

    // 4️⃣ Error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      console.error(err);
    });

    // 5️⃣ Start server on Render port
    const port = parseInt(process.env.PORT || "5000", 10);
    app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Backend serving on port ${port}`);
    });

  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1); // Exit if startup fails
  }
}

// Run the server
startServer();
