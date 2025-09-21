"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import SideBarList from "./SideBarList";
import useChatStore from "@/store/useChatStore";

const NewChatButton = ({ session }: { session: any }) => {
  const { addChat } = useChatStore();
  const user = session?.user;
  return (
    <div
      onClick={() => addChat(user)}
      className="w-full rounded-md py-2 flex gap-3 hover:bg-[#242424] px-2 cursor-pointer"
    >
      <i className="ri-chat-3-line"></i> New Chat
    </div>
  );
};

export function AppSidebar({ session }: { session: any }) {
  return (
    <Sidebar
      className="bg-[#181818] text-white border border-[#181818]"
    >
      <SidebarHeader
        className="bg-[#181818] text-white"
      >
        <div className="mt-10">
          <NewChatButton session={session} />
        </div>
      </SidebarHeader>
      <SidebarContent
        className="bg-[#181818] text-white"
      >
        <SidebarGroup>
          <div className="w-full">
            <SideBarList session={session} />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        className="bg-[#181818] text-white"
      >
        <div className="flex justify-center items-center w-full h-10 text-gray-500 text-sm">
          <p>Made with ❤️ by Cogni</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
