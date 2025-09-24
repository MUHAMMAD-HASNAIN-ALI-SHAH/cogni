import MessagesComponent from "@/components/Mesages/MessagesComponent";
import Navbar from "@/components/Navbar/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user ?? {};
  return (
    <SidebarProvider className="">
      <AppSidebar user={user}  />
      <div className="w-full h-screen bg-gray-200">
        <Navbar />
        <div className="flex w-full h-[90vh]">
          <MessagesComponent />
        </div>
      </div>
    </SidebarProvider>
  );
}
