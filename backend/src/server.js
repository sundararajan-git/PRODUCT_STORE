import express from "express";
import cors from "cors";
import { conectDB } from "./DB/conectDB.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve()

//middelwares
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

// allowd origins
app.use(cors(corsOptions));

// access the data in json format
app.use(express.json());

// enable cookie parsing
app.use(cookieParser());

// user routes
app.use("/api/users", userRouter);

// products routes
app.use("/api/products", productRouter);


// production to serve the static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../FRONTEND/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FRONTEND", "dist", "index.html"))
  })
}

app.listen(port, () => {
  conectDB();
  console.log(`Server is running on port ${port}`);
});
