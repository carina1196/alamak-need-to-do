import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRoute } from "./routes/userRoute.js";
import { todoRoute } from "./routes/todoRoute.js";

//connection to MongoDB
try {
  mongoose.connect("mongodb://localhost:27017/alamaktodoapp");
} catch (err) {
  console.error(err);
}

const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Add this line

app.use("/user", userRoute);
app.use("/todo", todoRoute);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
