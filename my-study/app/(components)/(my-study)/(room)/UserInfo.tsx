"use client";
import { useLazyGetUserQuery } from "@/app/api/apiSlice";
import ReduxProvider from "@/app/api/store/redux-provider";
import { useAppDispatch, useAppSelector } from "@/app/api/store/store";
import { selectUser, setUserState } from "@/app/api/store/userSlice.js";
import React, { useEffect } from "react";

function UserInfo({ token }: { token: string | undefined }) {
  const dispatch = useAppDispatch(); // Move hook outside of useEffect
  const userInfo = useAppSelector(selectUser);
  const [getUser, getUserRes] = useLazyGetUserQuery();
  useEffect(() => {
    if (!userInfo.initialized) {
      getUser(undefined);
    }
  }, [userInfo, token, dispatch]); // Add missing dependencies
  useEffect(() => {
    if (getUserRes.status === "fulfilled") {
      console.log(getUserRes)
      dispatch(setUserState(getUserRes.currentData.user));
    }
  }, [getUserRes]);

  return <></>; // Render can be expanded based on your needs
}

export default UserInfo;
