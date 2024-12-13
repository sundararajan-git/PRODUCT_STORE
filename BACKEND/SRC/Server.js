import express from "express";
import cors from "cors";
import { conectDB } from "./DB/ConectDB.js"
import userRouter from "./ROUTES/Auth.Routes.js";
// import productRouter from "./routes/products";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

//MIDDELWARES

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// ALLOWD ORIGINS
app.use(cors());

// ACCESS THE DATA IN JSON FORMAT
app.use(express.json());

// USER ROUTES
app.use("/api/users", userRouter);

// PRODUCT ROUTES
// app.use("/api/products", productRouter)

app.listen(port, () => {
  conectDB()
  console.log(`Server is running on port ${port}`);
});