"use client";
import { LetterContext } from "@/app/(my-study)/(letter)/layout";
import {
  selectCurrentState,
  setCurrentState,
} from "@/app/api/store/letterSlice";
import { useAppDispatch, useAppSelector } from "@/app/api/store/store";
import React, { useContext } from "react";

function WriteLetterFooter({ token }: { token: string | undefined }) {
  const dispatch = useAppDispatch();

  const letterContext = useContext(LetterContext);
  if (!letterContext) {
    throw new Error("WritingArea must be used within a LetterProvider");
  }

  const { contents, setContents } = letterContext;
  const handleArchive = async () => {
    try {
      dispatch(setCurrentState({ contents: contents }));
      const draftData = useAppSelector(selectCurrentState);
      const draftRes = await fetch("/api/Letters/save-draft", {
        method: "POST",

        body: draftData,
        headers: { Cookie: `token=${token}` },
      });
    } catch (error) {}
  };

  const handleDiscard = () => {};

  const handleSend = () => {};
  return (
    <div id="footer" className="w-full flex py-4 px-8 border-t justify-between">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
        onClick={handleArchive}
      >
        Archive
      </button>
      <div>
        <button
          className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleDiscard}
        >
          Discard
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default WriteLetterFooter;
