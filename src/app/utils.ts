import { BookData } from "./components/AddBook";
export function isValidISBN(isbn: string): boolean {
  // Regular expression to match the ISBN format (10 or 13 digits)
  const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

  // Remove any hyphens from the ISBN string
  const cleanedISBN = isbn.replace(/-/g, "");

  // Check if the ISBN matches the regex pattern
  return isbnRegex.test(cleanedISBN);
}

export function verifyBookForm(bookData: BookData, cover: File | null) {
    const errors: { [key: string]: string | null } = {};
  
    if (!bookData.name.trim()) {
      errors.name = "Name is required";
    }
  
    if (!isValidISBN(bookData.isbn)) {
      errors.isbn = "Invalid ISBN format";
    }
  
    if (!bookData.author.trim()) {
      errors.author = "Author is required";
    }
  
    if (!bookData.category.trim()) {
      errors.category = "Category is required";
    }
  
    if (bookData.price === null || isNaN(bookData.price)) {
      errors.price = "Price is required";
    }
  
    if (!cover) {
      errors.cover = "Cover image is required";
    }
  
    return errors;
  }
  
  
  
  

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes === 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const digitGroups = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  return (
    parseFloat((sizeInBytes / Math.pow(1024, digitGroups)).toFixed(2)) +
    " " +
    units[digitGroups]
  );
};
