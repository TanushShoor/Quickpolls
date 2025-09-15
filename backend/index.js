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

// app.use(express.json());
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
// app.get("/", (req, res) => {
//   res.send("QuickPolls API is running");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/polls", pollRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import pollRoutes from "./routes/polls.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());          // parse incoming JSON
app.use(cookieParser());           // parse cookies

// CORS – allow frontend at localhost:3000 to send cookies
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,               // allow cookies to be sent
  })
);

// Basic test route
app.get("/", (req, res) => {
  res.send("QuickPolls API is running ✅");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
