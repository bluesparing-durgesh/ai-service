import express from "express";
import { callModel } from "../controller/ai.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/call-ollama", authenticate,callModel);

export default router;