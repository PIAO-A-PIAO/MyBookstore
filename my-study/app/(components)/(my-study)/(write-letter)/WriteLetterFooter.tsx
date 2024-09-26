"use client";
import { LetterContext } from "@/app/(my-study)/(letter)/layout";
import { useSaveDraftMutation } from "@/app/api/apiSlice";
import { useAppDispatch } from "@/app/api/store/store";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

function WriteLetterFooter({ token }: { token: string | undefined }) {
  const dispatch = useAppDispatch();
  const [saveDraft, { isLoading, isError, data: saveDraftRes }] = useSaveDraftMutation();
  const router = useRouter();
  const letterContext = useContext(LetterContext);
  
  if (!letterContext) {
    throw new Error("No LetterContext");
  }

  const { formData, setShowModal, setEdited } = letterContext;

  const handleArchive = async () => {
    try {
      await saveDraft(JSON.stringify(formData)).unwrap();
    } catch (error) {
      console.error('Failed to save draft: ', error);
    }
  };

  useEffect(() => {
    if (saveDraftRes) {
      setEdited(false);
      setShowModal("archive");
    }
  }, [saveDraftRes, setEdited, setShowModal]);

  const handleDiscard = () => {};
  const handleSend = () => {};

  return (
    <div id="footer" className="w-full flex py-4 px-8 border-t justify-between">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
        onClick={handleArchive}
        disabled={isLoading} // Disable while loading
      >
        {isLoading ? "Saving..." : "Archive"}
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
      {isError && <div>Error saving draft.</div>}
    </div>
  );
}

export default WriteLetterFooter;
