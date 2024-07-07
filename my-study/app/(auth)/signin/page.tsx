"use client";

import { ChangeEvent, useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
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
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label>Email/User Name</label>
              <input
                value={formData.user}
                onChange={handleChange}
                name="user"
                className="w-full p-2 rounded-md border-2"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <label>Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-md border-2"
                type="password"
                required
              />
            </div>
            <button className="w-full p-2 bg-gray-900 text-gray-50 rounded-md">
              Sign In
            </button>
          </form>
          <p>
            Don't have an account yet? <a href="/signup">Sign Up</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
