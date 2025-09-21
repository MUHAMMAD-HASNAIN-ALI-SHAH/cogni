import MessagesComponent from "@/components/Mesages/MessagesComponent";
import Navbar from "@/components/Navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";

export default async function Home() {
  return (
    <SidebarProvider className="">
      <AppSidebar  />
      <div className="w-full h-screen bg-gray-200">
        <Navbar />
        <div className="flex w-full h-[90vh]">
          <MessagesComponent />
        </div>
      </div>
    </SidebarProvider>
  );
}
