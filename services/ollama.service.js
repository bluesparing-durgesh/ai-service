import axios from "axios";
import { env } from "../config/env.js";

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