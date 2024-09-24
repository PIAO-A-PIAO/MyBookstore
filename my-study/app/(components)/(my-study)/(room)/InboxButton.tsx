"use client";
import { selectInboxState, setInboxState } from "@/app/api/store/letterSlice";
import ReduxProvider from "@/app/api/store/redux-provider";
import { useAppDispatch, useAppSelector } from "@/app/api/store/store";
import React, { useEffect } from "react";

const InboxButton = ({ token }: { token: any }) => {
  return (
    // <ReduxProvider>
      <InboxButtonCore token={token} />
    // </ReduxProvider>
  );
};

function InboxButtonCore({ token }: { token: any }) {
  const dispatch = useAppDispatch();
  const inboxInfo = useAppSelector(selectInboxState);
  useEffect(() => {
    if (!inboxInfo.initialized) {
      const fetchData = async () => {
        try {
          const inboxRes = await fetch(`/api/Letters/get-inbox`, {
            headers: { Cookie: `token=${token}` },
          });
          const inboxData = await inboxRes.json();
          dispatch(setInboxState(inboxData.inbox)); // Dispatch the inbox fetched from API
        } catch (error) {
          console.error("Failed to fetch inbox:", error);
        }
      };
      fetchData();
    }
  }, [inboxInfo, dispatch, token]);
  return (
    <a className="bg-blue-600 p-4 text-white rounded-lg">
      New letters - this is an envlope on windowsill
    </a>
  );
}

export default InboxButton;
