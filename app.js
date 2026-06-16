import express from "express";

import aiRoutes from "./routes/ai.routes.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

app.use(express.json({ limit: "5mb" }));

app.use(authenticate);
app.use(apiLimiter);

app.use("/api/v1/ai", aiRoutes);

export default app;