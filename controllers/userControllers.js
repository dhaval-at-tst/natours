const User = require("../models/userModel");
const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");
const AppError = require("./../utils/appError");

const routeYetNotDefined = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.cPassword) {
    return next(
      new AppError(
        "This route is not for password updates. Please use '/updatePassword'",
        400
      )
    );
  }
  // filtered out unwanted fields names that are not allowed to be update
  const filteredBody = filterObj(req.body, "name", "email");
  // Update user document
  // body:role:'admin'
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getUser = routeYetNotDefined;
exports.createUser = routeYetNotDefined;
exports.updateUser = routeYetNotDefined;
exports.deleteUser = routeYetNotDefined;
