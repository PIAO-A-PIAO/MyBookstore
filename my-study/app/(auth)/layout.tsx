import React from "react";
import PublicTopbar from "../(components)/(topbar)/PublicTopbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicTopbar authPage />
      <div className="grid grid-cols-2 w-full min-h-screen">
      <div className="flex flex-col bg-gray-900 items-center justify-center">
        <div className="max-w-md space-y-4 text-gray-50">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to My Study
          </h1>
          <p className="text-lg">
            A place to unlock your imagination and have fun.
          </p>
        </div>
      </div>
      {children}
      </div>
    </div>
  );
};

export default AuthLayout;
