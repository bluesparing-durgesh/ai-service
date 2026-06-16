import express from "express";

import aiRoutes from "./routes/ai.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import cors from "cors"

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "5mb" }));
app.use(cors("*"));
// app.use(authenticate);
app.use(apiLimiter);

app.get("/", (req, res) => {
  res.json({ status: "running" });
});

app.use("/api/v1/ai", aiRoutes);

export default app;