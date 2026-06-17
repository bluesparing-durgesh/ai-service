import { web_search } from "../config/webSearch.js";
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
    const { prompt, model } = req.body;
    if (!prompt) return res.status(400).json({ success: false, message: "Prompt is required" });

    // 1. Establish the chat memory log
    const messages = [
      { 
        role: "system", 
        content: "You are a helpful assistant. If the user asks for real-time information, dates, or time, you MUST use the web_search tool immediately." 
      },
      { role: "user", content: prompt }
    ];

    // 2. Pass stream: false first to easily read if the model wants a tool
    const initialResult = await chat(messages, model, false);
    const assistantMessage = initialResult.message;

    // 3. Check if a tool call was requested
    if (assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolCall = assistantMessage.tool_calls[0];

      if (toolCall.function.name === "web_search") {
        const query = toolCall.function.arguments.query;
     
        // A. Run your Tavily function
        const searchResults = await web_search(query);

        // B. Feed the tool result back into the chat history sequence
        messages.push(assistantMessage); // Save the model's intent to call the tool
        messages.push({
          role: "tool",
          content: JSON.stringify(searchResults) // Provide the findings
        });

     
        // C. Request the final streaming response with the loaded context
        const finalStream = await chat(messages, model, true);
        
        res.setHeader("Content-Type", "application/x-ndjson");
        return finalStream.pipe(res);
      }
    }

    // 4. Fallback: If no tools were tripped, request a streaming text-only completion
    // We add the text message back since it wasn't a tool request
    messages.push(assistantMessage);
    
    // Instead of hitting the API a third time, we can just write out the response 
    // or request a clean stream for standard user prompts from the start:
    const standardStream = await chat([{ role: "user", content: prompt }], model, true);
    
    res.setHeader("Content-Type", "application/x-ndjson");
    standardStream.pipe(res);

  } catch (error) {
    console.error("Controller Execution Error:", error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};
// Le6A.Eb4iP@NjvJ

