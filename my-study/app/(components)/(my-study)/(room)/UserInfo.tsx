"use client";
import ReduxProvider from "@/app/api/store/redux-provider";
import { useAppDispatch } from "@/app/api/store/store";
import { setUserState } from "@/app/api/store/userSlice.js";
import React, { useEffect } from "react";

function UserInfoCore({ user }: { user: any }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      dispatch(setUserState(user));
    }
  }, [user, dispatch]);
  return <></>;
}

function UserInfo({ user }: { user: any }) {
  return (
    <ReduxProvider>
      <UserInfoCore user={user} />
    </ReduxProvider>
  );
}

export default UserInfo;
