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
      cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(4000, () => console.log("Server ready on port 4000."));

module.exports = app;