import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import {
  baseUrl,
  equalObj,
  formatFileSize,
  objAllFilled,
  trimFileName,
  verifyBookForm,
  getFileFromPath,
} from "../utils";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  handleHidePopup,
  selectCurrentBook,
  selectMobileView,
  selectType,
} from "../redux/popupSlice";
import { BookData, selectBooks } from "../redux/booksSlice";

import {
  useAddBookMutation,
  useEditBookMutation,
  useGetCategoriesQuery,
} from "../redux/apiSlice";
import { handleShowAlert } from "../redux/alertSlice";

const ModifyBook: React.FC = () => {
  const dispatch = useAppDispatch();
  const [addBook, addBookRes] = useAddBookMutation();
  const [editBook, editBookRes] = useEditBookMutation();
  const getCategoriesRes = useGetCategoriesQuery();

  const type = useAppSelector(selectType);
  const book = useAppSelector(selectCurrentBook);
  const books = useAppSelector(selectBooks);
  const mobileView = useAppSelector(selectMobileView);

  const [categories, setCategories] = useState<string[]>([]);
  const [coverChanged, setCoverChanged] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [cover, setCover] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

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

  const onHidePopup = () => {
    dispatch(handleHidePopup());
  };

  useEffect(() => {
    if (getCategoriesRes?.currentData) {
      setCategories(getCategoriesRes.currentData);
    }
  }, [getCategoriesRes]);

  // if in edit mode, retrieve image file for replacement
  useEffect(() => {
    if (type === "edit") {
      getFileFromPath(baseUrl + book.image)
        .then((file) => {
          setCover(file);
        })
        .catch((error) => {
          console.error("Error fetching file:", error);
        });
    }
  }, [book]);

  const onSubmit = async () => {
    const formErrors = verifyBookForm(bookData, books, type);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      if (type === "add" && cover) {
        const formData = new FormData();
        formData.append("cover", cover);
        axios.post(baseUrl + "/add-cover", formData).catch((error) =>
          handleShowAlert({
            success: false,
            message: "Error adding book",
          })
        );
        try {
          await addBook(bookData).unwrap();
          // Show success alert
          dispatch(
            handleShowAlert({
              success: true,
              message: "Book added successfully!",
            })
          );
          onHidePopup();
        } catch (error) {
          // Show fail alert
          dispatch(
            handleShowAlert({
              success: false,
              message: "Error adding book!",
            })
          );
        }
      } else if (type === "edit") {
        if (coverChanged && cover) {
          const formData = new FormData();
          formData.append("cover", cover);
          axios.post(baseUrl + "/add-cover", formData).catch((error) =>
            handleShowAlert({
              success: false,
              message: "Error editing book",
            })
          );
        }
        try {
          await editBook({
            updatedBook: bookData,
            coverImage: coverChanged ? book.image : null,
          }).unwrap();
          // Show success alert
          dispatch(
            handleShowAlert({
              success: true,
              message: "Book edited successfully!",
            })
          );
          onHidePopup();
        } catch (error) {
          // Show fail alert
          dispatch(
            handleShowAlert({
              success: false,
              message: "Error editing book!",
            })
          );
        }
      }
    }
  };

  // input tag for file upload
  const ref = useRef<HTMLInputElement | null>(null);
  const onImageChange = () => {
    ref.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      // Only handle the first selected file
      const selectedFile = fileList[0];
      setCover(selectedFile);
      setCoverChanged(true);
      setBookData({ ...bookData, image: `/assets/${selectedFile.name}` });
    }
  };

  const removeImage = () => {
    setCover(null);
    setBookData({ ...bookData, image: "" });
  };

  // submit button disabled only if all field filled or book info changed (in edit mode)
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
    <div
      id="popup_content"
      className={`w-full flex flex-col gap-2 ${
        mobileView ? "h-60 overflow-y-scroll" : ""
      }`}
    >
      {errors.general ? (
        <p id="error_general" className="text-red-error text-body4 h-3">
          {errors.general}
        </p>
      ) : (
        <div className="h-3" />
      )}
      <div
        id="container_1"
        className={`flex ${mobileView ? "flex-col gap-2" : "gap-8"} w-full`}
      >
        {cover ? (
          <div
            id="cover_container"
            className={`flex flex-col ${mobileView ? "w-full" : "w-1/2"} py-3`}
          >
            <div
              id="cover_button"
              className="secondary-btn hover:bg-white w-full h-full flex flex-col items-center gap-3 p-4"
            >
              <div className="w-full h-fit flex justify-end">
                <button onClick={removeImage}>
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
              <div
                id="cover_image_container"
                style={{ aspectRatio: "2/3" }}
                className={`flex w-3/5 items-center overflow-hidden drop-shadow-[8px_8px_0px_rgba(0,0,0,0.25)] ${
                  errors.image ? "border-red-error" : ""
                }`}
              >
                <img src={URL.createObjectURL(cover)} alt="Book Cover" />
              </div>
              <div
                id="cover_info_container"
                className="flex flex-col w-3/5 h-fit items-start justify-center overflow-hidden"
              >
                <p>{trimFileName(cover.name)}</p>
                <p className="text-gray-600 text-cap3">
                  {formatFileSize(cover.size)}
                </p>
              </div>
            </div>
            {errors.image ? (
              <p className="text-red-error text-body4 h-3">{errors.image}</p>
            ) : (
              <div className="h-3" />
            )}
          </div>
        ) : (
          <div
            id="upload_button_container"
            className={`flex flex-col ${mobileView ? "w-full" : "w-1/2"} py-3`}
          >
            <button
              onClick={onImageChange}
              className={`secondary-btn w-full h-full flex flex-col items-center justify-center gap-4 ${
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
        <div
          id="info_container"
          className={`flex flex-col ${mobileView ? "w-full" : "w-1/2"}`}
        >
          <label id="name" className="label w-full gap-1">
            <p>
              <span className="text-red-error">*</span>Name:
            </p>
            <input
              className={`input ${errors.name ? "border-red-error" : ""}`}
              type="text"
              name="name"
              required
              value={bookData.name}
              onChange={(e) =>
                setBookData({ ...bookData, name: e.target.value })
              }
            />
            {errors.name ? (
              <p className="text-red-error text-body4 h-3">{errors.name}</p>
            ) : (
              <div className="h-3" />
            )}
          </label>
          <label id="isbn" className="label w-full gap-1">
            <p>
              <span className="text-red-error">*</span>ISBN:
            </p>
            <input
              className={`input ${errors.isbn ? "border-red-error" : ""}`}
              type="text"
              name="isbn"
              required
              value={bookData.isbn}
              onChange={(e) =>
                setBookData({ ...bookData, isbn: e.target.value })
              }
            />
            {errors.isbn ? (
              <p className="text-red-error text-body4 h-3">{errors.isbn}</p>
            ) : (
              <div className="h-3" />
            )}
          </label>
          <label id="author" className="label w-full gap-1">
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
          <label id="category" className="label w-full gap-1">
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
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category ? (
              <p className="text-red-error text-body4 h-3">{errors.category}</p>
            ) : (
              <div className="h-3" />
            )}
          </label>
          <label id="price" className="label w-full gap-1">
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
              <p className="text-red-error text-body4 h-3 h-3">
                {errors.price}
              </p>
            ) : (
              <div className="h-3" />
            )}
          </label>
        </div>
      </div>
      <div id="buttons_container" className="w-full flex justify-end">
        <div id="buttons" className="w-fit flex gap-4">
          <button
            className={`secondary-btn ${mobileView ? "p-2" : ""}`}
            type="button"
            onClick={onHidePopup}
          >
            Cancel
          </button>
          {enableSubmit ? (
            <button
              className={`primary-btn ${mobileView ? "p-2" : ""}`}
              type="button"
              onClick={onSubmit}
            >
              {type === "edit" ? "Edit Book" : "Add Book"}
            </button>
          ) : (
            <div className={`primary-btn-disabled ${mobileView ? "p-2" : ""}`}>
              {type === "edit" ? "Edit Book" : "Add Book"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifyBook;
