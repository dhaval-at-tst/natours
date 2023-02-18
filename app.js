const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const AppError = require("./utils/appError");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const { globalErrorHandler } = require("./controllers/errorController");

const app = express();

// GLOBAL MIDDLEWARE
// Set security HTTP headers
app.use(helmet());

// Development logging
app.use(morgan("dev"));
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan());
// }

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

// routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  //   res.status(404).json({
  //     status: "fail",
  //     message: `Can't find ${req.originalUrl} on this server!`,
  //   });

  //   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  //   err.status = "fail";
  //   err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
