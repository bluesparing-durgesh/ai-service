import axios from "axios";
import { env } from "../config/env.js";

const models ={
  model1:"qwen3:8b",
  model2:"deepseek-r1:8b"
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


export const chat = async (prompt,model=models.model2) => {
  const response = await axios.post(
    env.LLAMA_API_ENDPOINT,
    {
      model: model,
      prompt,
      stream: true,
      keep_alive: "24h",
    },
    {
      responseType: "stream",
    }
  );

  return response.data;
};