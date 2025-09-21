import MessagesComponent from "@/components/Mesages/MessagesComponent";
import Navbar from "@/components/Navbar/Navbar";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <SidebarProvider className="">
      <AppSidebar  session={session} />
      <div className="w-full h-screen bg-gray-200">
        <Navbar session={session} />
        <div className="flex w-full h-[90vh]">
          <MessagesComponent session={session} />
        </div>
      </div>
    </SidebarProvider>
  );
}
