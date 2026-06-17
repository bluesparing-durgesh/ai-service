import { chat, generateResponse } from "../services/ollama.service.js";

export const callModel = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    if (text.length > 50000) {
      return res.status(400).json({
        success: false,
        message: "Prompt too large",
      });
    }

    const result = await generateResponse(text);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("errpr",error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const chatController = async (req, res) => {
  try {
    const { prompt,model } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }
    if (prompt.length > 50000) {
      return res.status(400).json({
        success: false,
        message: "Prompt too large",
      });
    }
    const stream = await chat(prompt,model);

    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    stream.pipe(res);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// Le6A.Eb4iP@NjvJ

