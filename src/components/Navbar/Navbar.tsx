"use client";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "@/components/ui/button";
import DropDown from "./DropDown";

const Navbar = () => {
  return (
    <div className="h-[10vh] select-none bg-[#212121] text-[#ECECEC] border-b-2 border-[#181818] w-full flex justify-between items-center py-5 px-3">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="cursor-pointer hover:bg-[#212121] hover:text-white text-white" />
        <Link href={"/"} className="font-semibold">
          Cogni
        </Link>
      </div>
      <div className="">
        <div>
          <DropDown  />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
