import axios from "axios";
import { env } from "../config/env.js";



export async function web_search(query,retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await axios.post(
        "https://api.tavily.com/search",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.WEB_SEARCH_API}`,
          },
        }
      );
        if(res.status === 200){
            const results = res.data.results;
            if(results.length > 0 && results.length<=5){
                return results;
            }else if(results.length > 5){
              return results.slice(0,5);
            }
         
        }
    } catch (error) {

      if (attempt === retries) throw error; // out of retries, give up for real
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1))); // wait a bit longer each retry
    }
  }
}