import express from "express";
import cors from "cors";
import { conectDB } from "./DB/conectDB.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// env file config
dotenv.config();

// create the app
const app = express();

const port = process.env.PORT || 8080;


// allowed origins
const whiteList = ['http://localhost:5173']

// condition apply
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  optionSuccessStatus: 200,
  credentials: true,
}


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


app.listen(port, () => {
  conectDB();
  console.log(`Server is running on port ${port}`);
});
