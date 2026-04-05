import express from "express";
import personRoutes from "./routes/personRoutes.js";
import { logger, unknownEndpoint } from "./utils/middleware.js";
import { getInfo } from "./controllers/personController.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/api", personRoutes);

app.get("/info", getInfo);

app.use(unknownEndpoint);

export default app;
