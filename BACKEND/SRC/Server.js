import express from "express";
import cors from "cors";
import { conectDB } from "./DB/ConectDB.js"
import userRouter from "./ROUTES/Auth.Routes.js";
import productRouter from "./ROUTES/Product.Routes.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

//MIDDELWARES
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

// ALLOWD ORIGINS
app.use(cors(corsOptions));

// ACCESS THE DATA IN JSON FORMAT
app.use(express.json());

// ENABLE COOKIE PARSING
app.use(cookieParser());

// USER ROUTES
app.use("/api/users", userRouter);

// PRODUCTS ROUTES
app.use("/api/products", productRouter)

app.listen(port, () => {
  conectDB()
  console.log(`Server is running on port ${port}`);
});