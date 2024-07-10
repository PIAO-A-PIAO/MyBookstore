import React from "react";
import DashboardLayout from "./(components)/DashboardLayout";

const DriftingBottles = () => {
  return (
    <DashboardLayout>
      <iframe className="w-full h-full" src="http://localhost:3000"/>
    </DashboardLayout>
  );
};

export default DriftingBottles;
