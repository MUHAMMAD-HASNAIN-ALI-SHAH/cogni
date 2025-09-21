"use client";
import useChatStore from "@/store/useChatStore";
import useMessageStore from "@/store/useMessageStore";
import { useState } from "react";

const InputComponent = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, sendMessageLoader } = useMessageStore();
  const { selectedChat, createChat, tempChat } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageLoader) return;

    if (tempChat) {
      await createChat(message);
      await sendMessage({ message, chatId: selectedChat?._id });
    }

    if (selectedChat) {
      await sendMessage({ message, chatId: selectedChat._id });
    }

    setMessage("");
  };

  return (
    <div className="w-full h-[15%] flex justify-center items-center p-4 bg-[#212121]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-2xl bg-[#303030] rounded-2xl px-4 py-2"
      >
        <input
          type="text"
          className="flex-grow bg-transparent text-white outline-none placeholder-gray-400 px-2 py-2"
          placeholder="Type your message here ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          disabled={sendMessageLoader}
          type="submit"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-black/75 transition"
        >
          {sendMessageLoader ? (
            <svg
              aria-hidden="true"
              className="w-4 h-4 animate-spin text-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624..."
                fill="currentFill"
              />
            </svg>
          ) : (
            <i className="ri-arrow-up-line text-white text-lg" />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputComponent;
