import app from "./app.js";
import { env } from "./config/env.js";
import { web_search } from "./config/webSearch.js";

app.listen(env.PORT,  () => {

  console.log(`Server running on port ${env.PORT}`);
});