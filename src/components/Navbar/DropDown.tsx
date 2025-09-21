"use client";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropDown = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenu>
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
    </DropdownMenu>
  );
};

export default DropDown;
