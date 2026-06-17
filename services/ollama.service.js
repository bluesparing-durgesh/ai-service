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
  const response = await axios.post(
    env.LLAMA_API_ENDPOINT,
    {
      model: model,
      messages:prompt,
      stream: true,
      tools,
      keep_alive: "24h",
    },
    {
      responseType: "stream",
    }
  );

  return response.data;
};