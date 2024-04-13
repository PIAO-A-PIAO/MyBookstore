"use client";
import { useAppDispatch, useAppSelector } from "./api/store";
import { selectBooks, setBooks } from "./api/booksSlice";
import booklist from "../../public/booklist";
import { BookInfoRow } from "./components/BookInfoRow";
import { useState } from "react";
import Pagination from "./components/Pagination";
import Popup from "./components/Popup";
import AddBook from "./components/AddBook";

export default function Home() {
  const dispatch = useAppDispatch();
  dispatch(setBooks(booklist));
  const reduxBooklist = useAppSelector(selectBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of books per page

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

  // State for controlling the visibility of the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to open the popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-8">
      <div className="flex flex-col w-full md:w-4/5 lg:w-2/3 h-fit border border-gray-200 rounded-lg">
        <div className="flex justify-between items-center p-8">
          <div className="flex flex-col text-h4">All books in store</div>
          <div className="flex">
            <button className="primary-btn flex gap-2 items-center" onClick={openPopup}>
              <svg
                className="w-4 h-4 text-gray-700 dark:text-white"
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
              Add New Book
            </button>
          </div>
        </div>
        <div className="w-full grid grid-cols-12 md:gap-6 lg:gap-10 bg-gray-100 py-4 md:px-4 lg:px-8 font-inter text-cap2 text-gray-600 justify-start">
          <div className="col-span-5">Book</div>
          <div className="col-span-2">Author</div>
          <div className="col-span-2">Category</div>
          <div>Price</div>
        </div>
        {booksOnPage.map((book) => (
          <BookInfoRow key={book.isbn} book={book} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Popup title="Add New Book" isOpen={isPopupOpen} onClose={closePopup}>
        {/* Add form or content for adding a new book */}
        <AddBook onCancel={closePopup} />
        {/* Add form inputs or other content here */}
      </Popup>
    </main>
  );
}
