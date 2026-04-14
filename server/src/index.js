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
    origin: ["http://localhost:3000", "*"],
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

// Chat endpoint — CLI sends message, server calls AI and streams back
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

    // Stream response back
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    let fullResponse = "";
    await aiService.sendMessage(aiMessages, (chunk) => {
      fullResponse += chunk;
      res.write(chunk);
    });

    await chatService.addMessage(conversation.id, "assistant", fullResponse);

    // Update title on first message
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

app.get("/api/client-id", (req, res) => {
  res.json({ clientId: process.env.GITHUB_CLIENT_ID });
});

app.get("/device", async (req, res) => {
  const { user_code } = req.query;
  res.redirect(`http://localhost:3000/device?user_code=${user_code}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});