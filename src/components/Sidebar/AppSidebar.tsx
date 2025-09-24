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
import Auth from "./Auth";

const NewChatButton = () => {
  const { addChat } = useChatStore();
  return (
    <div
      onClick={() => addChat()}
      className="w-full rounded-md py-2 flex gap-3 hover:bg-[#242424] px-2 cursor-pointer"
    >
      <i className="ri-chat-3-line"></i> New Chat
    </div>
  );
};

export function AppSidebar({
  user,
}: {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}) {
  return (
    <Sidebar className="bg-[#181818] text-white border border-[#181818]">
      <SidebarHeader className="bg-[#181818] text-white">
        <div className="mt-10">
          <NewChatButton />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#181818] text-white">
        <SidebarGroup>
          <div className="w-full">
            <SideBarList />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#212121] text-white">
        <Auth user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
