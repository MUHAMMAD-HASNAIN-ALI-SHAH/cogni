import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Auth = ({
  user,
}: {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  return (
    <DropdownMenu>
      {/* ---------- Trigger Button ---------- */}
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 hover:bg-[#2c2c2c] transition-colors">
          <span className="flex items-center justify-center rounded-full bg-[#181818] px-3 py-2 font-semibold text-white">
            {user.name?.charAt(0)}
          </span>
          <span className="text-white font-medium">{user.name}</span>
        </button>
      </DropdownMenuTrigger>

      {/* ---------- Dropdown Menu ---------- */}
      <DropdownMenuContent
        className="w-56 bg-[#212121] border border-[#2c2c2c] rounded-md shadow-md"
        align="end"
      >
        {/* ---- Profile Dialog ---- */}
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()} // keep menu open for dialog
          className="p-0"
        >
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-white hover:bg-[#2c2c2c] rounded-md transition-colors">
                <User className="w-4 h-4" />
                Profile
              </button>
            </DialogTrigger>

            <DialogContent className="bg-[#212121] border border-[#2c2c2c] text-white rounded-xl p-6 max-w-sm">
              <DialogHeader className="text-center space-y-4">
                <DialogTitle className="text-xl font-bold">
                  Your Profile
                </DialogTitle>

                {/* Profile picture */}
                <div className="flex justify-center">
                  <Image
                    src={user.image || ""}
                    alt="Profile Picture"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-[#2c2c2c] shadow-md"
                  />
                </div>

                <DialogDescription className="flex flex-col gap-4 text-gray-300">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm uppercase tracking-wide text-gray-400">
                      Name
                    </span>
                    <span className="text-lg font-semibold text-white">
                      {user.name}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm uppercase tracking-wide text-gray-400">
                      Email
                    </span>
                    <span className="text-lg font-medium text-white break-all">
                      {user.email}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => handleLogout()}
          className="cursor-pointer px-4 py-2 flex items-center gap-2 text-white hover:bg-[#2c2c2c] rounded-md transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Auth;
