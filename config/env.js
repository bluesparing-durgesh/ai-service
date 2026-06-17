import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  API_KEY: process.env.API_KEY,
  LLAMA_API_ENDPOINT: process.env.LLAMA_API_ENDPOINT,
  TIMEOUT: process.env.TIMEOUT || 60000,
  WEB_SEARCH_API:process.env.WEB_SEARCH_API,

};