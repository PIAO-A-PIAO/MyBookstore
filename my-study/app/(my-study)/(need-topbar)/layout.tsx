import React from "react";
import PrivateTopbar from "../../(components)/(topbar)/PrivateTopbar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full">
        <PrivateTopbar/>
        {children}{" "}
      </div>
    </div>
  );
};

export default DashboardLayout;
