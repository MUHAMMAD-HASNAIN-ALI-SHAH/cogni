import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  chatName: {
    type: String,
    required: true,
  },
  totalChats: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
