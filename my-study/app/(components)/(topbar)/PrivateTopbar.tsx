"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import ProfileButton from "./ProfileButton";
import ReduxProvider from "../../api/store/redux-provider";
import LanguageSwitch from "./LanguageSwitch";
import DarkModeButton from "./DarkModeButton";

const PrivateTopbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-gray-50 w-full">
      <div className="w-full flex items-center justify-between px-6 py-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            My Study
          </span>
        </a>
        <div className="flex gap-4 items-center">
          <LanguageSwitch/>
          <DarkModeButton/>
          <ReduxProvider>
            <ProfileButton />
          </ReduxProvider>
        </div>
      </div>
    </nav>
  );
};

export default PrivateTopbar;
