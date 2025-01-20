import React from "react";
import AppSidebar from "./AppSidebar";
import AppMapWrapper from "./AppMapWrapper";
import ProfileDetail from "./ProfileDetail";
import { useStore } from "@/hooks/useStore";
import Dashboard from "./Dashboard";
import { Toaster } from "./ui/toaster";
import SidebarToggleButton from "./SidebarToggleButton";

const AppLayout: React.FC = () => {
  const { state } = useStore();

  return (
    <div className="overflow-hidden w-full max-w-full">
      {state.isDashboardOpen ? (
        <Dashboard />
      ) : (
        <>
          <AppSidebar />
          <AppMapWrapper />
          <SidebarToggleButton className="z-[999] absolute top-5 right-5" />
        </>
      )}
      <ProfileDetail />
      <Toaster />
    </div>
  );
};

export default AppLayout;
