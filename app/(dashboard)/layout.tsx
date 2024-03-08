"use client";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import UserSidebar from "@/components/sidebar-user";
import { useGetChats } from "@/lib/utils";
import { useSession } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // 로그인 여부에 따라 "sidebar"
  const { data: session } = useSession();
  const { data: chats } = useGetChats(session);

  // 추후 작업창에 대해서는 md -> lg 변경 혹은 사이드바 안보이게 조정
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        ({session ? <UserSidebar chats={chats} /> : <Sidebar />})
      </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300">
        <main className="md:pl-72 pb-10 ">
          <Navbar />
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
