import { env } from "../config/env.js";

export const authenticate = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== env.API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};