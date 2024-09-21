import React from "react";
import UserInfo from "@/app/(components)/(my-study)/(room)/UserInfo";
import { cookies } from "next/headers";
const Room = async () => {
  let user;
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.BASE_URL}/api/Users/get-user`, {
      headers: { Cookie: `token=${token?.value}` },
    });
    const data = await res.json();
    user = data.user;
  } catch (err) {}
  return (
    <>
      <UserInfo user={user} />
      <main className="bg-gray-50 flex flex-col w-screen h-screen items-center justify-between p-24">
        <a href="/write" className="bg-blue-600 p-4 text-white rounded-lg">
          Write letters - this is a table
        </a>
        <a className="bg-blue-600 p-4 text-white rounded-lg">
          New letters - this is an envlope on windowsill
        </a>
        <a className="bg-blue-600 p-4 text-white rounded-lg">
          Letter history/friend list - this is a shelf
        </a>
        <a className="bg-blue-600 p-4 text-white rounded-lg">
          notification - this is a wind chime
        </a>
        <a className="bg-blue-600 p-4 text-white rounded-lg">
          Supplies - this is a drawer
        </a>
        <a className="bg-blue-600 p-4 text-white rounded-lg">
          Profile/settings - this is a map
        </a>
      </main>
    </>
  );
};

export default Room;
