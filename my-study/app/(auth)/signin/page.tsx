"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
    "remember-me": false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRememberMe = () =>
    setFormData((prev) => ({
      ...prev,
      "remember-me": !formData["remember-me"],
    }));

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();
    const response = await fetch("/api/Users/signin", {
      method: "POST",
      body: JSON.stringify({ formData }),
    });
    if (!response.ok) {
      const result = await response.json();
      setErrorMsg(result.message);
    } else {
      const result = await response.json();
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} method="post" className="space-y-4">
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
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={handleRememberMe}
                checked={formData["remember-me"]}
                name="remember-me"
              />
              <label>Remember Me</label>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-gray-900 text-gray-50 rounded-md"
            >
              Sign In
            </button>
          </form>
          <p>
            Don't have an account yet? <a href="/signup">Sign Up</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
