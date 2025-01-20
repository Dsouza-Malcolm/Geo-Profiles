import React from "react";
import AppSidebar from "./AppSidebar";
import AppMapWrapper from "./AppMapWrapper";
import ProfileDetail from "./ProfileDetail";
import { useStore } from "@/hooks/useStore";
import Dashboard from "./Dashboard";
import { Toaster } from "./ui/toaster";

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
        </>
      )}
      <ProfileDetail />
      <Toaster />
    </div>
  );
};

export default AppLayout;
