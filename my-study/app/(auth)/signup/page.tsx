"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();
    const response = await fetch("/api/Users/signup", {
      method: "POST",
      body: JSON.stringify({ formData }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (!response.ok) {
      const result = await response.json();
      setErrorMsg(result.message);
    } else {
      console.log(response);
      // router.refresh();
      // router.push("/");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <p className="text-gray-600">
              Enter your user name and email to register an account
            </p>
          </div>
          <form onSubmit={handleSubmit} method="post" className="space-y-4">
            <div className="space-y-2">
              <label>Full Name</label>
              <input
                name="name"
                onChange={handleChange}
                value={formData.name}
                className="w-full p-2 rounded-md border-2"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <label>Email</label>
              <input
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="w-full p-2 rounded-md border-2"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label>Password</label>
              <input
                name="password"
                onChange={handleChange}
                value={formData.password}
                className="w-full p-2 rounded-md border-2"
                type="password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-gray-900 text-gray-50 rounded-md"
            >
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <a href="/signin">Sign In</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
