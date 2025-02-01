import express from "express";
import cors from "cors";
import { conectDB } from "./DB/conectDB.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

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


app.listen(port, () => {
  conectDB();
  console.log(`Server is running on port ${port}`);
});
