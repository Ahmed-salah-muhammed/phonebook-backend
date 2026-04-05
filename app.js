import express from "express";
import mongoose from "mongoose";
import personRoutes from "./routes/personRoutes.js";
import { logger, unknownEndpoint, errorHandler } from "./utils/middleware.js";
import { getInfo } from "./controllers/personController.js";

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

app.use(express.json());
app.use(logger);

app.use("/api", personRoutes);

app.get("/info", getInfo);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
