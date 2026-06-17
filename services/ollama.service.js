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



export const chat = async (prompt, model = models.model1) => {
try {
    const response = await axios.post(
    env.LLAMA_API_ENDPOINT,
    {
      model: model,
      messages:prompt,
      stream: true,
      tools:tools,
      keep_alive: "24h",
    },
    {
      responseType: "stream",
    }
  );

  return response.data;
} catch (error) {
  console.error("❌ OLLAMA API ERROR DETECTED:");
    
    // If it's a stream error, we must read the stream chunks to see the error text
    if (error.response && error.response.data) {
      error.response.data.on('data', (chunk) => {
        console.error("Error Reason from Ollama:", chunk.toString());
      });
    } else {
      console.error(error.message);
    }
  throw error;

}
};