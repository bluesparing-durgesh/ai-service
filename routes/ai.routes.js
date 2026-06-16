import express from "express";
import { callModel, chatController } from "../controller/ai.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();
// router.post("/call-ollama", authenticate,callModel);
router.post("/chat", authenticate,chatController);

export default router;