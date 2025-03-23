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
