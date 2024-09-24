"use client"
import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { LetterContext } from "@/app/(my-study)/(letter)/layout";

function WritingArea() {
  const letterContext = useContext(LetterContext);
  if (!letterContext) {
    throw new Error("WritingArea must be used within a LetterProvider");
  }

  const { contents, setContents } = letterContext;
  const maxLines = 17;

  const hrElements = [];
  for (let i = 0; i < maxLines; i++) {
    hrElements.push(
      <hr className="border-gray-900" style={{ height: "6cqmin" }} key={i} />
    );
  }
  const [currentPage, setCurrentPage] = useState(0);
  const [shadowContent, setShadowContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shadowTextareaRef = useRef<HTMLTextAreaElement>(null);
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContents = [...contents];
    updatedContents[currentPage] = e.target.value;
    setContents(updatedContents);
    setShadowContent(e.target.value);
  };
  return (
    <div
      id="paper-bg"
      style={{ containerType: "size" }}
      className="relative mx-auto my-10 bg-paper1 w-2/3 aspect-paper bg-no-repeat bg-cover flex items-center justify-center"
    >
      <div id="page-number" className="absolute top-3">
        {currentPage + 1}
      </div>
      <div
        id="lines"
        className="absolute w-4/5 h-4/5"
        style={{ paddingTop: "6cqmin" }}
      >
        {hrElements}
      </div>
      <textarea
        ref={textareaRef}
        value={contents[currentPage]}
        onChange={handleChangeContent}
        style={{
          fontSize: "2.5cqmin",
          lineHeight: "6cqmin",
          paddingTop: "1cqmin",
        }}
        className="absolute outline-none bg-transparent resize-none w-4/5 h-4/5 z-10 no-scrollbar whitespace-pre-wrap break-words"
        placeholder="Write your letter here..."
      ></textarea>
      <textarea
        ref={shadowTextareaRef}
        value={shadowContent}
        onChange={() => {
          console.log("wrong textarea");
        }}
        style={{
          fontSize: "2.5cqmin",
          lineHeight: "6cqmin",
        }}
        className="absolute outline-none bg-transparent resize-none w-4/5 h-4/5 z-0 no-scrollbar whitespace-pre-wrap break-words text-transparent"
      ></textarea>
    </div>
  );
}

export default WritingArea;
