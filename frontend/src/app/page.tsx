"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import BookInfoRow from "./components/BookInfoRow";
import Pagination from "./components/Pagination";
import Popup from "./components/Popup";
import { selectBooks, setBooks, BookData } from "./redux/booksSlice";
import {
  handleShowPopup,
  selectMobileView,
  setMobileView,
} from "./redux/popupSlice";
import { useGetBooklistQuery } from "./redux/apiSlice";
import Alert from "./components/Alert";

export default function Home() {
  const dispatch = useAppDispatch();
  const booklistRes = useGetBooklistQuery();

  useEffect(() => {
    if (booklistRes?.currentData) {
      dispatch(setBooks(booklistRes.currentData));
    }
  }, [booklistRes]);

  const reduxBooklist = useAppSelector(selectBooks);
  const mobileView = useAppSelector(selectMobileView);

  // pages variables
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(reduxBooklist.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const booksOnPage = reduxBooklist.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const openPopup = () => {
    dispatch(handleShowPopup({ type: "add" }));
  };

  // check if the browser width is lower than 640 (mobile view)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && !mobileView) {
        dispatch(setMobileView(true));
      } else if (window.innerWidth > 640 && mobileView) {
        dispatch(setMobileView(false));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileView]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8 px-6 sm:px-10 md:px-20 lg:px-40 xl:px-60">
      <Alert />
      <div
        id="list_container"
        className="flex flex-col w-full h-fit border border-gray-200 rounded-lg"
      >
        <div
          id="head_container"
          className="flex justify-between items-center p-4 sm:p-8 border-b"
        >
          <div
            id="header"
            className={`flex flex-col ${mobileView ? "text-h6" : "text-h4"}`}
          >
            {reduxBooklist?.length || "All"} books in store
          </div>
          <button
            id="add_book"
            className="primary-btn w-fit flex gap-2 p-2 items-center"
            onClick={openPopup}
          >
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14m-7 7V5"
              />
            </svg>
            {mobileView ? "Add Book" : "Add New Book"}
          </button>
        </div>
        {mobileView ? null : (
          <div id="columns" className="w-full grid grid-cols-11 sm:gap-4 md:gap-5 lg:gap-8 bg-gray-100 py-4 sm:px-4 md:px-5 lg:px-8 text-gray-600 justify-start">
            <div className="grid col-span-10 grid-cols-subgrid grid-cols-10 sm:gap-4 md:gap-2 lg:gap-4 items-center text-left sm:text-body4 lg:text-body3">
              <div className="col-span-5">Book</div>
              <div className="col-span-2">Author</div>
              <div className="col-span-2">Category</div>
              <div>Price</div>
            </div>
          </div>
        )}
        {booksOnPage.map((book: BookData) => (
          <BookInfoRow key={book.isbn} book={book} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Popup />
    </main>
  );
}
