import React from "react";
import UserInfo from "@/app/(components)/(my-study)/(room)/UserInfo";
import { cookies } from "next/headers";
import WriteLetterButton from "@/app/(components)/(my-study)/(room)/WriteLetterButton";
import UnreadLetterButton from "@/app/(components)/(my-study)/(room)/UnreadButton";
const Room = async () => {
  let user;
  let unsent;
  let unread;
  try {
    const token = cookies().get("token");
    const userRes = await fetch(`${process.env.BASE_URL}/api/Users/get-user`, {
      headers: { Cookie: `token=${token?.value}` },
    });
    const letterRes = await fetch(
      `${process.env.BASE_URL}/api/Letters/get-unread-and-unsent`,
      {
        headers: {
          Cookie: `token=${token?.value}`,
        },
      }
    );
    const userData = await userRes.json();
    const letterData = await letterRes.json()
    user = userData.user;
    unread = letterData.unread;
    unsent = letterData.unsent;
  } catch (err) {}
  return (
    <>
      <UserInfo user={user} />
      <main className="bg-gray-50 flex flex-col w-screen h-screen items-center justify-between p-24">
        <WriteLetterButton unsent={unsent} />
        <UnreadLetterButton unread={unread} />
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
