import express from "express";
import cors from "cors";
import { conectDB } from "./DB/conectDB.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

const whiteList = ["http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/products", productRouter);

app.use(errorHandler);

app.listen(port, () => {
  conectDB();
  console.log(`Server is running on port ${port}`);
});

// import { google } from "googleapis";
// import multer from "multer";
// import fs from "fs";

// // Multer config to handle file upload
// const upload = multer({ dest: "uploads/" });

// // Google Auth
// const auth = new google.auth.GoogleAuth({
//   keyFile: "service-account.json", // Make sure this is in .gitignore
//   scopes: ["https://www.googleapis.com/auth/drive.file"],
// });

// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     console.log("it's loging..");

//     const authClient = await auth.getClient();
//     const drive = google.drive({ version: "v3", auth: authClient });

//     console.log(req.file);

//     const fileMetadata = {
//       name: req.file.originalname,
//       parents: ["APPS"],
//     };

//     const media = {
//       mimeType: req.file.mimetype,
//       body: fs.createReadStream(req.file.path),
//     };

//     const driveResponse = await drive.files.create({
//       resource: fileMetadata,
//       media: media,
//       fields: "id",
//     });

//     // Delete local file after upload
//     fs.unlinkSync(req.file.path);

//     res.json({
//       message: "File uploaded to Google Drive",
//       fileId: driveResponse.data.id,
//     });
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Failed to upload file" });
//   }
// });
