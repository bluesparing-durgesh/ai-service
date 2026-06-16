import express from "express";
import { callModel } from "../controller/ai.controller.js";

const router = express.Router();
router.post("/call-ollama", callModel);

export default router;