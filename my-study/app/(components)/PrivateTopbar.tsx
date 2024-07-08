"use client";
import React, { useState, useEffect, useRef } from "react";

const PrivateTopbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-gray-50 w-full">
      <div className="w-full flex items-center justify-end px-6 py-2">
        <div className="flex gap-4 items-center">
          <button>
            <img src="/assets/notification.svg" />
          </button>
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
};

const ProfileButton = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<any>();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event:MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="relative w-8 h-8" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <img
          src="/assets/profile.jpg"
          className="border-2 border-gray-200 rounded-full"
        />
      </button>
      {dropdownVisible && (
        <div className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg">
          <a
            href="/"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Profile Settings
          </a>
          <a
            href="/logout"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Log Out
          </a>
        </div>
      )}
    </div>
  );
};

export default PrivateTopbar;
