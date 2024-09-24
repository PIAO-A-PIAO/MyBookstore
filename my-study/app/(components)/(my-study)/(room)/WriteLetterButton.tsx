"use client";
import { selectDraftsState, setDraftsState } from "@/app/api/store/letterSlice";
import ReduxProvider from "@/app/api/store/redux-provider";
import { useAppDispatch, useAppSelector } from "@/app/api/store/store";
import React, { useEffect } from "react";

const WriteLetterButton = ({ token }: { token: any }) => {
  return (
    // <ReduxProvider>
    <WriteLetterButtonCore token={token} />
    // </ReduxProvider>
  );
};

function WriteLetterButtonCore({ token }: { token: any }) {
  const dispatch = useAppDispatch();
  const draftsInfo = useAppSelector(selectDraftsState);
  useEffect(() => {
    if (!draftsInfo.initialized) {
      const fetchData = async () => {
        try {
          const draftsRes = await fetch(`/api/Letters/get-drafts`, {
            headers: { Cookie: `token=${token}` },
          });
          const draftsData = await draftsRes.json();
          dispatch(setDraftsState(draftsData.drafts))
        } catch (error) {
          console.error("Failed to fetch drafts:", error);
        }
      };
      fetchData();
    }
  }, [draftsInfo, dispatch, token]);
  return (
    <a href="/write" className="bg-blue-600 p-4 text-white rounded-lg">
      Unsent letters - this is a table
    </a>
  );
}

export default WriteLetterButton;
