import React from "react";
import LeftSideBar from "../(components)/LeftSideBar";
import PrivateTopbar from "../(components)/PrivateTopbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <LeftSideBar />
      <div className="flex flex-col h-screen w-full">
        <PrivateTopbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
