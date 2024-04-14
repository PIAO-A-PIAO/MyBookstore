import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import {
  equalObj,
  formatFileSize,
  objAllFilled,
} from "../utils";
import { categories } from "../../../public/categories";
import { verifyBookForm } from "../utils";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  handleHidePopup,
  selectCurrentBook,
  selectType,
} from "../redux/popupSlice";
import { BookData, selectBooks } from "../redux/booksSlice";
import { getFileFromPath } from "../utils";
import axios from "axios";
import { useAddBookMutation } from "../redux/apiSlice";
import { handleShowAlert } from "../redux/alertSlice";

const ModifyBook: React.FC = () => {
  const [addBook, addBookRes] = useAddBookMutation();
  const type = useAppSelector(selectType);
  const book = useAppSelector(selectCurrentBook);
  const books = useAppSelector(selectBooks);
  const [enableSubmit, setEnableSubmit] = useState(false);

  const dispatch = useAppDispatch();
  const onHidePopup = () => {
    dispatch(handleHidePopup());
  };
  const [cover, setCover] = useState<File | null>(null);
  useEffect(() => {
    if (type === "edit") {
      getFileFromPath(book.image)
        .then((file) => {
          setCover(file);
        })
        .catch((error) => {
          console.error("Error fetching file:", error);
        });
    }
  }, [book]);
  const [bookData, setBookData] = useState<BookData>(
    book || {
      isbn: "",
      name: "",
      author: "",
      category: "",
      price: "",
      image: "",
    }
  );
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const onSubmit = async () => {
    const formErrors = verifyBookForm(bookData, books);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      if (type === "add" && cover) {
        const formData = new FormData();
        formData.append("cover", cover);
        axios.post("http://localhost:4000/add-cover", formData).catch((error) =>
          handleShowAlert({
            color: "red-error",
            message: "Error adding book",
          })
        );
        try {
          // Execute the mutation
          const result = await addBook(bookData).unwrap();
          // Show success alert
          dispatch(
            handleShowAlert({
              color: "blue-cta",
              message: "Book added successfully!",
            })
          );
          onHidePopup();
        } catch (error) {
          dispatch(
            handleShowAlert({
              color: "red-error",
              message: "Error adding book!",
            })
          );
        }
      } else if (type === "edit") {
      }
    }
  };

  const ref = useRef<HTMLInputElement | null>(null); // Ref is of type RefObject<HTMLInputElement>

  const onImageChange = () => {
    ref.current?.click();
  };
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      // Only handle the first selected file
      const selectedFile = fileList[0];
      setCover(selectedFile);
      setBookData({ ...bookData, image: `/assets/${selectedFile.name}` });
    }
  };

  const removeImage = () => {
    setCover(null);
    setBookData({ ...bookData, image: "" });
  };

  useEffect(() => {
    setErrors({});
    if (type === "edit") {
      setEnableSubmit(!equalObj(book, bookData));
    }
    if (type === "add") {
      setEnableSubmit(objAllFilled(bookData));
    }
  }, [bookData]);

  return (
    <div id="popup_content" className="w-full flex flex-col gap-4">
      {errors.general ? (
        <p id="error_general" className="text-red-error text-body4 h-3">
          {errors.general}
        </p>
      ) : (
        <div className="h-3" />
      )}
      <div id="container_1" className="flex w-full gap-8">
        {cover ? (
          <div id="cover_container" className="flex flex-col w-1/2 gap-1">
            <div
              id="cover_button"
              className="secondary-btn w-full flex items-center"
            >
              <div
                id="inner_container"
                className="flex w-full py-1 gap-3 items-start"
              >
                <div
                  id="cover_image_container"
                  className={`h-12 w-8 overflow-hidden drop-shadow-[2px_2px_0px_rgba(0,0,0,0.25)] ${
                    errors.image ? "border-red-error" : ""
                  }`}
                >
                  <img
                    className="m-1 object-cover"
                    src={URL.createObjectURL(cover)}
                    alt="Book Cover"
                  />
                </div>
                <div
                  id="cover_info_container"
                  className="flex flex-col items-start justify-end"
                >
                  <p>{cover.name}</p>
                  <p>{formatFileSize(cover.size)}</p>
                </div>
              </div>
              <button
                onClick={removeImage}
                className="w-fitz h-full items-start"
              >
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 13"
                  />
                </svg>
              </button>
            </div>
            {errors.image ? (
              <p className="text-red-error text-body4 h-3">{errors.image}</p>
            ) : (
              <div className="h-3" />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-1 py-1 w-1/2">
            <button
              onClick={onImageChange}
              className={`secondary-btn w-full flex flex-col items-center justify-center ${
                errors.image ? "border-red-error" : ""
              }`}
            >
              <svg
                className="w-5 h-5 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-2M8 9l4-5 4 5m1 8h0"
                />
              </svg>
              Click to upload book cover
              <input
                type="file"
                ref={ref}
                hidden
                onChange={handleImageChange}
              />
            </button>
            {errors.image ? (
              <p className="text-red-error text-body4 h-3">{errors.image}</p>
            ) : (
              <div className="h-3" />
            )}
          </div>
        )}
        <label className="label w-1/2 gap-1">
          <p>
            <span className="text-red-error">*</span>Name:
          </p>
          <input
            className={`input ${errors.name ? "border-red-error" : ""}`}
            type="text"
            name="name"
            required
            value={bookData.name}
            onChange={(e) => setBookData({ ...bookData, name: e.target.value })}
          />
          {errors.name ? (
            <p className="text-red-error text-body4 h-3">{errors.name}</p>
          ) : (
            <div className="h-3" />
          )}
        </label>
      </div>
      <div className="w-full flex gap-8">
        <label className="label w-1/2 gap-1">
          <p>
            <span className="text-red-error">*</span>ISBN:
          </p>
          <input
            className={`input ${errors.isbn ? "border-red-error" : ""}`}
            type="text"
            name="isbn"
            required
            value={bookData.isbn}
            onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
          />
          {errors.isbn ? (
            <p className="text-red-error text-body4 h-3">{errors.isbn}</p>
          ) : (
            <div className="h-3" />
          )}
        </label>
        <label className="label w-1/2 gap-1">
          <p>
            <span className="text-red-error">*</span>Author:
          </p>
          <input
            className={`input ${errors.author ? "border-red-error" : ""}`}
            type="text"
            name="author"
            required
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
          />
          {errors.author ? (
            <p className="text-red-error text-body4 h-3">{errors.author}</p>
          ) : (
            <div className="h-3" />
          )}
        </label>
      </div>
      <div className="w-full flex gap-8">
        <label className="label w-1/2 gap-1">
          <p>
            <span className="text-red-error">*</span>Category:
          </p>
          <select
            className={`input ${errors.category ? "border-red-error" : ""}`}
            name="category"
            required
            value={bookData.category}
            onChange={(e) =>
              setBookData({ ...bookData, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          {errors.category ? (
            <p className="text-red-error text-body4 h-3">{errors.category}</p>
          ) : (
            <div className="h-3" />
          )}
        </label>
        <label className="label w-1/2 gap-1">
          <p>
            <span className="text-red-error">*</span>Price:
          </p>
          <div
            className={`input ${
              errors.price ? "border-red-error" : ""
            } flex items-center gap-2`}
          >
            <p>CAD</p>
            <input
              type="number"
              step={0.01}
              value={bookData.price}
              onChange={(e) =>
                setBookData({ ...bookData, price: e.target.value })
              }
              className="w-full p-0 border-none outline-none focus:ring-0 bg-gray-50"
              required
            />
          </div>
          {errors.price ? (
            <p className="text-red-error text-body4 h-3 h-3">{errors.price}</p>
          ) : (
            <div className="h-3" />
          )}
        </label>
      </div>
      <div className="w-full flex justify-end">
        <div className="w-fit flex gap-4">
          <button className="secondary-btn" type="button" onClick={onHidePopup}>
            Cancel
          </button>
          {enableSubmit ? (
            <button className="primary-btn" type="button" onClick={onSubmit}>
              Add Book
            </button>
          ) : (
            <div className="primary-btn-disabled">Add Book</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifyBook;
