const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const instrumentRouter = require("./routers/instrumentRouter");
const constitutionRouter = require("./routers/constitutionRouter");
const chapterRouter = require("./routers/chapterRouter");
const sectionRouter = require("./routers/sectionRouter");
const userRouter = require("./routers/userRouter");
const cors = require("cors");
const AppError = require("./utils/appError");

const app = express();

//Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

//Routes
app.use(
  "/api/v2/constitutions",
  constitutionRouter,
  chapterRouter,
  sectionRouter
);
app.use("/api/v2/auth", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use((err, req, res, next) => {
  res.status(200).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
});

module.exports = app;
