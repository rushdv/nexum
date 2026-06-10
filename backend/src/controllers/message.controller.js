import sanitizeHtml from "sanitize-html";
import MessageModel from "../models/message.model.js";

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await MessageModel.getConversations(req.user.id);
    res.json(conversations);
  } catch (err) {
    next(err);
  }
};

export const getOrCreateConversation = async (req, res, next) => {
  try {
    const { id: otherUserId } = req.params;
    const conversationId = await MessageModel.findOrCreateConversation(req.user.id, Number(otherUserId));
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const messages = await MessageModel.getMessages(conversationId, page, limit);
    const participants = await MessageModel.getParticipants(conversationId);
    res.json({ conversationId, messages, participants });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id: conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const messages = await MessageModel.getMessages(conversationId, page, limit);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { id: conversationId } = req.params;
    const { content } = req.body;
    const senderId = req.user.id;

    if (!content) return res.status(400).json({ message: "Content is required" });

    content = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });
    const message = await MessageModel.sendMessage({ conversationId, senderId, content });

    const participants = await MessageModel.getParticipants(conversationId);
    const io = req.app.get("io");
    if (io) {
      for (const p of participants) {
        io.to(`user:${p.id}`).emit("newMessage", { conversationId, message });
      }
    }

    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};
