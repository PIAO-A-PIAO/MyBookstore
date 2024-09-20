import React from "react";
import EmptyTopbar from "@/app/(components)/EmptyTopbar";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-full">
        <EmptyTopbar />
        {children}{" "}
      </div>
    </div>
  );
};

export default DashboardLayout;
