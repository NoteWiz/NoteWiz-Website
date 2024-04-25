import express from "express";
const app = express();
import mongoose from "mongoose";
app.use(express.json());
import cors from "cors";
app.use(cors());
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

app.use("/files", express.static("files"));
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
//mongodb connection----------------------------------------------
const mongoUrl =
  "mongodb+srv://waqasfaraz75:KmxRIfxuR58AP225@cluster0.wawtxh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//multer------------------------------------------------------------
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

import "./pdfDetails.js";
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

app.use('/components', express.static(path.join(__dirname, 'components')));


//apis----------------------------------------------------------------
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(4000, () => {
  console.log("Server Started");
});