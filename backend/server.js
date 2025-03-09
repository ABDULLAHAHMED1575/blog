import express from "express";
import { connectDB } from "./config/db.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import errorResponseHandler, { invalidPathHandler } from "./middleware/ErrorHandler.js";
import cors from "cors";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Routes
import userRouter from "./routes/UserRoutes.js";
import postRouter from "./routes/PostRoutes.js";
import { commentRouter } from "./routes/commentRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const config = {
  port: process.env.PORT || 8080,
  corsOrigin: process.env.CORS_ORIGIN,
  nodeEnv: process.env.NODE_ENV || "development",
};

app.use(
  cors({
    origin: config.corsOrigin,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.options("*", cors());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);


const PORT = process.env.PORT || 8080;

app.use(invalidPathHandler);
app.use(errorResponseHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
