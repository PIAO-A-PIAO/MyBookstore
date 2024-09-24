"use client";
import ReduxProvider from "@/app/api/store/redux-provider";
import { useAppDispatch, useAppSelector } from "@/app/api/store/store";
import { selectUser, setUserState } from "@/app/api/store/userSlice.js";
import React, { useEffect } from "react";

function UserInfoCore({ token }: { token: string | undefined }) {
  const dispatch = useAppDispatch(); // Move hook outside of useEffect
  const userInfo = useAppSelector(selectUser);
  useEffect(() => {
    if (!userInfo.initialized) {
      const fetchData = async () => {
        try {
          const userRes = await fetch(`/api/Users/get-user`, {
            headers: { Cookie: `token=${token}` },
          });
          const userData = await userRes.json();
          dispatch(setUserState(userData.user)); // Dispatch the user fetched from API
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      };
      fetchData();
    }
  }, [userInfo, token, dispatch]); // Add missing dependencies

  return <></>; // Render can be expanded based on your needs
}

function UserInfo({ token }: { token: string | undefined }) {
  return (
    // <ReduxProvider>
      <UserInfoCore token={token} />
    // </ReduxProvider>
  );
}

export default UserInfo;
