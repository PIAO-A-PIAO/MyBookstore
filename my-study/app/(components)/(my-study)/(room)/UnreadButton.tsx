"use client";
import { setUnreadState } from "@/app/api/store/letterSlice";
import ReduxProvider from "@/app/api/store/redux-provider";
import { useAppDispatch } from "@/app/api/store/store";
import React, { useEffect } from "react";

function UnreadLetterButtonCore({ unread }: { unread: any }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (unread) {
      dispatch(setUnreadState(unread));
    }
  }, [unread, dispatch]);
  return (
    <a className="bg-blue-600 p-4 text-white rounded-lg">
      {unread.length} New letters - this is an envlope on windowsill
    </a>
  );
}

function UnreadLetterButton({ unread }: { unread: any }) {
  return (
    <ReduxProvider>
      <UnreadLetterButtonCore unread={unread} />
    </ReduxProvider>
  );
}

export default UnreadLetterButton;
