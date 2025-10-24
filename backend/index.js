import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import pollRoutes from "./routes/polls.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Hybrid CORS fix
const allowedOrigins = [
  "https://quickpolls-puce.vercel.app", // your deployed frontend
  "http://localhost:3000" // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Explicit preflight handler (Render fix)
// ✅ Explicit preflight handler (Render-safe version)
app.options("/*", (req, res) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

// Test route
app.get("/", (req, res) => {
  res.send("✅ QuickPolls API is running and CORS is fixed!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// // import express from "express";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import connectDB from "./config/db.js";
// // import authRoutes from "./routes/auth.js";
// // import pollRoutes from "./routes/polls.js";

// // dotenv.config();
// // connectDB();

// // const app = express();

// // app.use(express.json());
// // app.use(cookieParser());

// // app.use(
// //   cors({
// //     origin: "http://localhost:3000",
// //     credentials: true,
// //   })
// // );
// // app.get("/", (req, res) => {
// //   res.send("QuickPolls API is running");
// // });

// // app.use("/api/auth", authRoutes);
// // app.use("/api/polls", pollRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import pollRoutes from "./routes/polls.js";

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());          // parse incoming JSON
// app.use(cookieParser());           // parse cookies

// // CORS – allow frontend at localhost:3000 to send cookies
// app.use(
//   cors({
//     origin: "http://localhost:3000", // frontend URL
//     credentials: true,               // allow cookies to be sent
//   })
// );

// // Basic test route
// app.get("/", (req, res) => {
//   res.send("QuickPolls API is running ✅");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/polls", pollRoutes);

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// backend/index.js

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import pollRoutes from "./routes/polls.js";

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // CORS configuration
// const allowedOrigins = [
//   "http://localhost:3000",                  // local dev
//   ""  // your deployed frontend (update later)
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

// // Basic route
// app.get("/", (req, res) => {
//   res.send("QuickPolls API is running ✅");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/polls", pollRoutes);

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
// import pollRoutes from "./routes/polls.js";

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Updated and strict CORS setup
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://quickpolls-puce.vercel.app/"
// ];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204); // handle preflight properly
//   }
//   next();
// });

// // Test route
// app.get("/", (req, res) => {
//   res.send("QuickPolls API is running ✅");
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/polls", pollRoutes);

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
