import React from "react";
import DashboardLayout from "./(components)/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex w-full h-full p-8">
        <div className="flex flex-col w-full h-full items-center justify-center bg-gray-100">
          <div className="flex flex-col max-w-1/2 gap-4">
            <h1>Welcome to My Study</h1>
            <p>Dashboard under construction. Stay tuned.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
