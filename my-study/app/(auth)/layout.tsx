import React from "react";
import PublicTopbar from "../(components)/PublicTopbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicTopbar authPage />
      {children}
    </div>
  );
};

export default AuthLayout;
