"use client";
import { useLazyGetInboxQuery } from "@/app/api/apiSlice";
import { selectInboxState, setInbox } from "@/app/api/store/inboxSlice";
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
  const [getInbox, getInboxRes] = useLazyGetInboxQuery();
  const dispatch = useAppDispatch();
  const inboxInfo = useAppSelector(selectInboxState);
  useEffect(() => {
    if (!inboxInfo.initialized) {
      getInbox(undefined);
    }
  }, [inboxInfo, dispatch, token]);

  useEffect(() => {
    console.log();
    if (getInboxRes.status === "fulfilled") {
      console.log(getInboxRes);
      dispatch(setInbox(getInboxRes.currentData.inbox));
    }
  }, [getInboxRes]);
  return (
    <a className="bg-blue-600 p-4 text-white rounded-lg">
      New letters - this is an envlope on windowsill
    </a>
  );
}

export default InboxButton;
