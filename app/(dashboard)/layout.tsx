import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar />
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
