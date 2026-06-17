import axios from "axios";
import { env } from "../config/env.js";
import { tools } from "./tool.services.js";

const models = {
  model1: "qwen3:8b",
  model2: "deepseek-r1:8b"
}
export const generateResponse = async (text) => {
  const prompt = text;

  const { data } = await axios.post(
    env.LLAMA_API_ENDPOINT,
    {
      model: "qwen2.5:7b",
      prompt,
      stream: false,
    },
    {
      timeout: env.TIMEOUT,
    }
  );

  return data.response;
};




export const chat = async (messages, model = models.model1, stream = true) => {
  try {
    const targetUrl = env.LLAMA_API_ENDPOINT;

    const response = await axios.post(
      targetUrl,
      {
        model,
        messages, 
        stream,   
        tools,
        keep_alive: "24h",
      },
      {
        
        responseType: stream ? "stream" : "json",
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ OLLAMA API ERROR DETECTED:");
    if (error.response && stream && typeof error.response.data.on === "function") {
      error.response.data.on("data", (chunk) => {
        console.error("Error Reason from Ollama:", chunk.toString());
      });
    } else {
      console.error(error.response?.data || error.message);
    }
    throw error;
  }
};