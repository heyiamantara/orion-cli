import express from "express";
import { auth } from "./lib/auth.js";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import { AIService } from "./cli/ai/google-service.js";
import { ChatService } from "./services/chat.services.js";

const app = express();
const port = 3005;
const aiService = new AIService();
const chatService = new ChatService();

app.use(
  cors({
    origin: ["https://orion-cli.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

// Helper to get session from Bearer token
async function getSession(req) {
  return await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
}

app.get("/api/me", async (req, res) => {
  try {
    const session = await getSession(req);
    if (!session) return res.status(401).json({ error: "No active session" });
    return res.json(session);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get session" });
  }
});

app.get("/api/me/:access_token", async (req, res) => {
  const { access_token } = req.params;
  try {
    const session = await auth.api.getSession({
      headers: { authorization: `Bearer ${access_token}` },
    });
    if (!session) return res.status(401).json({ error: "Invalid token" });
    return res.json(session);
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

// Chat endpoint — regular chat
app.post("/api/chat", async (req, res) => {
  try {
    const session = await getSession(req);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { message, conversationId, mode = "chat" } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const conversation = await chatService.getOrCreateConversation(
      session.user.id,
      conversationId,
      mode
    );

    await chatService.addMessage(conversation.id, "user", message);

    const dbMessages = await chatService.getMessages(conversation.id);
    const aiMessages = chatService.formatMessagesForAI(dbMessages);

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    let fullResponse = "";
    await aiService.sendMessage(aiMessages, (chunk) => {
      fullResponse += chunk;
      res.write(chunk);
    });

    await chatService.addMessage(conversation.id, "assistant", fullResponse);

    const messages = await chatService.getMessages(conversation.id);
    if (messages.length <= 2) {
      await chatService.updateTitle(conversation.id, message.slice(0, 50));
    }

    res.end(JSON.stringify({ conversationId: conversation.id }));
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Tool chat endpoint
app.post("/api/chat/tool", async (req, res) => {
  try {
    const session = await getSession(req);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { message, conversationId } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const { getEnabledTools, enableTools } = await import("./config/tool.config.js");
    enableTools(["google_search", "code_execution"]);
    const tools = getEnabledTools();

    const conversation = await chatService.getOrCreateConversation(
      session.user.id, conversationId, "tool"
    );

    await chatService.addMessage(conversation.id, "user", message);
    const dbMessages = await chatService.getMessages(conversation.id);
    const aiMessages = chatService.formatMessagesForAI(dbMessages);

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    let fullResponse = "";
    await aiService.sendMessage(aiMessages, (chunk) => {
      fullResponse += chunk;
      res.write(chunk);
    }, tools);

    await chatService.addMessage(conversation.id, "assistant", fullResponse);
    res.end(JSON.stringify({ conversationId: conversation.id }));
  } catch (error) {
    console.error("Tool chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Agent endpoint
app.post("/api/chat/agent", async (req, res) => {
  try {
    const session = await getSession(req);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const { generateApplication } = await import("./config/agent.config.js");

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    const result = await generateApplication(message, aiService);
    res.end(JSON.stringify(result));
  } catch (error) {
    console.error("Agent error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/client-id", (req, res) => {
  res.json({ clientId: process.env.GITHUB_CLIENT_ID });
});

app.get("/device", async (req, res) => {
  const { user_code } = req.query;
  res.redirect(`https://orion-cli.vercel.app/device?user_code=${user_code}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});