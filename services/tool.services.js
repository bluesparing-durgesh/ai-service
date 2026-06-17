export const tools = [
  {
    type: "function",
    function: {
      name: "web_search",
      description: "Search the live web for current information — news, prices, dates, or anything that may have changed since training.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "The search query to look up" },
        },
        required: ["query"],
      },
    },
  },
];