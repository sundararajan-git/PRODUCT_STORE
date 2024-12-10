import express from "express";
import cors from "cors";
import connectDB from "./DB/ConnectDB"

const app = express();
const port =   process.env.PORT || 3000;

//MIDDELWARES

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    connectDB()
  console.log(`Server is running on port ${port}`);
});