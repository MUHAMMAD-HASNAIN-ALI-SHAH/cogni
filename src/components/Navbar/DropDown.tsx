"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useChatStore from "@/store/useChatStore";
import { Delete, Trash } from "lucide-react";

const DropDown = () => {
  const { selectedChat } = useChatStore();

  return (
    <DropdownMenu>
      {selectedChat && (
        <>
          <DropdownMenuTrigger asChild>
            <div className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white text-2xl font-bold pb-2.5">...</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-red-500 border border-red-600 hover:border-red-700 hover:bg-red-700"
            align="end"
          >
            <DropdownMenuItem className="cursor-pointer hover:bg-red-700 text-white transition duration-200">
              <Trash className="text-white" /> Delete Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
};

export default DropDown;

{
  /* <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer">
          <span className="text-gray-600 font-semibold">U</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer hover:bg-gray-200 transition duration-200"
        >
          <i className="ri-logout-box-r-line"></i> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu> */
}
