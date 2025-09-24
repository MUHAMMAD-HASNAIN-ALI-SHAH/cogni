import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import useMessageStore from "./useMessageStore";

interface Chat {
  _id: string;
  chatName: string;
  userId: string;
}

interface ChatStore {
  selectedChat: Chat | null;
  tempChat: boolean;
  chats: Chat[];
  chatsLoader: boolean;
  loadChats: () => void;
  addChat: () => void;
  selectChat: (chat: Chat) => void;
  createChat: (message: string) => void;
}

const useChatStore = create<ChatStore>((set, get) => ({
  selectedChat: null,
  tempChat: true,
  chats: [],
  chatsLoader: false,
  loadChats: async () => {
    try {
      set({ chatsLoader: true });
      // if (useChatStore.getState().selectedChat) return null;
      const response = await axios.get(`/api/chat`, {});
      set({ chatsLoader: false });
      set({ chats: response.data.chats });
    } catch (error) {
      console.log(error);
      toast.error("Error loading chats");
      set({ chatsLoader: false });
    }
  },
  addChat: async () => {
    try {
      useMessageStore.getState().messages = [];
      set({ selectedChat: null });
      set({ tempChat: true });
    } catch (error) {
      console.log(error);
      toast.error("Error adding chat");
    }
  },
  createChat: async (message) => {
    try {
      const form = {
        message,
      };
      const response = await axios.post(`/api/chat`, form);
      set({ selectedChat: response.data.chat });
      set({ tempChat: false });
      set({ chats: [response.data.chat, ...get().chats] });
    } catch (error) {
      console.log(error);
      toast.error("Error adding chat");
    }
  },
  selectChat: (chat) => {
    if (get().selectedChat?._id === chat._id) return;
    set({ tempChat: false });
    set({ selectedChat: chat });
    useMessageStore.getState().getMessages();
  },
}));

export default useChatStore;
