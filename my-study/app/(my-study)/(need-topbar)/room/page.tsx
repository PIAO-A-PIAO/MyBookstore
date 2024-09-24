import React from "react";
import UserInfo from "@/app/(components)/(my-study)/(room)/UserInfo";
import { cookies } from "next/headers";
import WriteLetterButton from "@/app/(components)/(my-study)/(room)/WriteLetterButton";
import InboxButton from "@/app/(components)/(my-study)/(room)/InboxButton";
const Room = async () => {
  const token = cookies().get("token");

  return (
    <>
      <UserInfo token={token?.value} />
      <main className="bg-gray-50 flex flex-col w-screen h-screen items-center justify-between p-24">
        <WriteLetterButton token={token?.value} />
        <InboxButton token={token?.value} />
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
