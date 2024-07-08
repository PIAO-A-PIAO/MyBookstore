import React from "react";

const PublicTopbar = ({ authPage }: { authPage: boolean }) => {
  return (
    <nav className=" border-gray-200 bg-gray-900 fixed top-0 left-0 w-full">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex gap-8">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              My Study
            </span>
          </a>

          <ul className="flex gap-x-4 items-center">
            <li>
              <a href="" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="" className="text-white">
                About
              </a>
            </li>
            <li>
              <a href="" className="text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {authPage ? null : (
          <ul className="flex gap-x-4">
            <li>
              <a href="/signin" className="text-white">
                Sign In
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Sign Up
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default PublicTopbar;
