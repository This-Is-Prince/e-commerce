// async errors
import "express-async-errors";
import path from "path";

// dotenv config
import { config } from "dotenv";
config();

import express from "express";
import morgan from "morgan";
import connectDB from "./db";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
// app
const app = express();
// port
const port = process.env.PORT || 3000;

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(path.resolve(__dirname, "public")));

// routes
app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("e-commerce api");
});
app.get("/api/v1", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("api");
});

app.use("/api/v1/auth", authRouter);

// error middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start
const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};
start();
