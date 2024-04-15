"use client";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { selectBooks, setBooks } from "./redux/booksSlice";
import { BookInfoRow } from "./components/BookInfoRow";
import { useState } from "react";
import Pagination from "./components/Pagination";
import Popup from "./components/Popup";
import ModifyBook from "./components/ModifyBook";
import { BookData } from "./redux/booksSlice";
import {
  handleShowPopup,
  selectMobileView,
  setMobileView,
  setTitle,
} from "./redux/popupSlice";
import { useEffect } from "react";
import { useAddBookMutation, useGetBooklistQuery } from "./redux/apiSlice";
import Alert from "./components/Alert";
import { handleHideAlert } from "./redux/alertSlice";

export default function Home() {
  const booklistRes = useGetBooklistQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (booklistRes?.currentData) {
      dispatch(setBooks(booklistRes.currentData));
    }
  }, [booklistRes]);
  const reduxBooklist = useAppSelector(selectBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1; // Number of books per page

  // Calculate total number of pages
  const totalPages = Math.ceil(reduxBooklist.length / pageSize);

  // Calculate indexes of the books to display
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;

  // Get books for the current page
  const booksOnPage = reduxBooklist.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Function to open the popup
  const openPopup = () => {
    // setIsPopupOpen(true);
    dispatch(handleShowPopup({ type: "add" }));
  };
  const mobileView = useAppSelector(selectMobileView);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && !mobileView) {
        // Hide the component if browser width is less than 640px
        // You can use state to conditionally render or directly return null
        // For this example, let's set a state
        dispatch(setMobileView(true));
      } else if (window.innerWidth > 640 && mobileView) {
        dispatch(setMobileView(false));
      }
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially
    handleResize();

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileView]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8 px-6 sm:px-10 md:px-20 lg:px-40 xl:px-60">
      <Alert />
      <div className="flex flex-col w-full h-fit border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center p-4 sm:p-8 border-b">
          <div
            className={`flex flex-col ${mobileView ? "text-h6" : "text-h4"}`}
          >
            All books in store
          </div>
          <button
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
          <div className="w-full grid grid-cols-11 sm:gap-4 md:gap-5 lg:gap-8 bg-gray-100 py-4 sm:px-4 md:px-5 lg:px-8 text-gray-600 justify-start">
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
      <Popup>
        <ModifyBook />
      </Popup>
    </main>
  );
}
