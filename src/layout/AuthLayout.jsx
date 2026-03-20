import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-2 geist-font">
        <Outlet/>
      <div className="h-[100vh] w-full">
        <img className="h-[100vh] w-full" src="/images/auth.png" />
      </div>
    </div>
  );
};

export default AuthLayout;

