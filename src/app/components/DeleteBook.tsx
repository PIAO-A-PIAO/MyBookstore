import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { handleHidePopup, selectCurrentBook } from "../redux/popupSlice";
import { useDeleteBookMutation } from "../redux/apiSlice";
import { handleShowAlert } from "../redux/alertSlice";

function DeleteBook() {
  const dispatch = useAppDispatch();
  const onHidePopup = () => {
    dispatch(handleHidePopup());
  };
  const [deleteBook, deleteBookRes] = useDeleteBookMutation();

  const book = useAppSelector(selectCurrentBook);
  const onDelete = async () => {
    try {
      await deleteBook({ bookId: book.bookId }).unwrap();
      dispatch(
        handleShowAlert({
          success: true,
          message: "Book deleted successfully!",
        })
      );
      onHidePopup();
    } catch (error) {
      dispatch(
        handleShowAlert({
          success: false,
          message: "Error deleting book!",
        })
      );
    }
  };
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <p className="w-2/3">
          Are you sure you want to delete{" "}
          <span className="text-h4">{book.name}</span>?
        </p>
        <img
          className="w-1/5 drop-shadow-[7px_7px_0px_rgba(0,0,0,0.25)]"
          src={book.image}
          alt={book.name}
        />
        <div className="w-full flex justify-end">
          <div className="w-fit flex gap-4">
            <button
              className="secondary-btn"
              type="button"
              onClick={onHidePopup}
            >
              Cancel
            </button>
            <button className="primary-btn" type="button" onClick={onDelete}>
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteBook;
