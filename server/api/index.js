const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "api/public/assets");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/add-cover", upload.single("cover"), (req, res) => {});

app.get("/", (req, res) => {
  res.send("Server is now running");
});

app.get("/booklist", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "booklist.json"));
});

app.get("/categories", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "categories.json"));
});

app.get("/assets/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, "public", "assets", imageName));
});

app.post("/add-cover", upload.single("cover"), (req, res) => {});

app.post("/add-book", (req, res) => {
  try {
    const book = req.body;

    const bookId = uuidv4();
    book.bookId = bookId;

    const bookListPath = path.join(__dirname, "public", "booklist.json");
    let bookList = [];
    if (fs.existsSync(bookListPath)) {
      bookList = JSON.parse(fs.readFileSync(bookListPath, "utf8"));
    }

    bookList.push(book);

    fs.writeFileSync(bookListPath, JSON.stringify(bookList, null, 2));

    res
      .status(200)
      .json({ message: "Book added successfully!", bookId: bookId });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/delete-book", (req, res) => {
  try {
    const { bookId } = req.body;
    
    const bookListPath = path.join(__dirname, "public", "booklist.json");
    let bookList = [];
    if (fs.existsSync(bookListPath)) {
      bookList = JSON.parse(fs.readFileSync(bookListPath, "utf8"));
    }

    const index = bookList.findIndex((book) => book.bookId === bookId);

    if (index !== -1) {
      const imagePath = path.join(__dirname, "public", bookList[index].image);

      bookList.splice(index, 1);

      fs.writeFileSync(bookListPath, JSON.stringify(bookList, null, 2));

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        } else {
          console.log("Image deleted successfully");
        }
      });

      res.status(200).json({ message: "Book deleted successfully!" });
    } else {
      res.status(404).json({ error: "Book not found!" });
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/edit-book", (req, res) => {
  try {
    const { updatedBook, coverImage } = req.body;
    const bookListPath = path.join(__dirname, "public", "booklist.json");
    let bookList = [];
    if (fs.existsSync(bookListPath)) {
      bookList = JSON.parse(fs.readFileSync(bookListPath, "utf8"));
    }

    const index = bookList.findIndex(
      (book) => book.bookId === updatedBook.bookId
    );

    if (index !== -1) {
      if (coverImage) {
        const imagePath = path.join(__dirname, "public", coverImage);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Error deleting image:", err);
          } else {
            console.log("Image deleted successfully");
          }
        });
      }

      bookList[index] = updatedBook;

      fs.writeFileSync(bookListPath, JSON.stringify(bookList, null, 2));

      res.status(200).json({ message: "Book updated successfully!" });
    } else {
      res.status(404).json({ error: "Book not found!" });
    }
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;
