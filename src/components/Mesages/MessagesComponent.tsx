"use client";
import useChatStore from "@/store/useChatStore";
import Chats from "./Chats";
import InputComponent from "../MessageInput/InputComponent";

const MessagesComponent = ({ session }: { session: any }) => {
  const { selectedChat, tempChat } = useChatStore();
  return (
    <div className="h-full w-full bg-[#212121]">
      {tempChat && !selectedChat && (
        <div className="h-full w-full flex flex-col justify-center items-center text-gray-500">
          <i className="ri-chat-3-line text-6xl mb-4"></i>
          <h1 className="text-2xl font-semibold">Welcome to Cogni</h1>
          <p className="text-center mt-2">
            Select a chat or start a new one to get started
          </p>
          <InputComponent />
        </div>
      )}
      {!tempChat && selectedChat && (
        <>
          <Chats session={session} />
          <InputComponent />
        </>
      )}
    </div>
  );
};

export default MessagesComponent;
