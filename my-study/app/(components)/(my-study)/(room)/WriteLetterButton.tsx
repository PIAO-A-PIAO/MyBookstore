"use client";
import { selectDraftsState } from "@/app/api/store/draftsSlice.js";
import { useAppDispatch, useAppSelector } from "@/app/api/store/store";
import React, { useEffect } from "react";
import { useLazyGetDraftsQuery } from "@/app/api/apiSlice";

function WriteLetterButton({ token }: { token: any }) {
  const [getDrafts, getDraftsRes] = useLazyGetDraftsQuery();
  const dispatch = useAppDispatch();
  const draftsInfo = useAppSelector(selectDraftsState);

  // Fetch drafts if they are not initialized or when drafts are invalidated
  useEffect(() => {
    if (!draftsInfo.initialized) {
      getDrafts(token); // Pass the token to the query if needed
    }
  }, [draftsInfo, getDrafts, token]);

  // Dispatch drafts to the Redux store when they are fetched
  // useEffect(() => {
  //   if (getDraftsRes.status === "fulfilled") {
  //     console.log(getDraftsRes);
  //     dispatch(setDrafts(getDraftsRes.currentData.drafts));
  //   }
  // }, [getDraftsRes]);

  return (
    <a href="/write" className="bg-blue-600 p-4 text-white rounded-lg">
      {draftsInfo.drafts.length} Unsent letters - this is a table
    </a>
  );
}

export default WriteLetterButton;
