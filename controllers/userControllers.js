const User = require("../models/userModel");
const { catchAsync } = require("../utils/catchAsync");

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
exports.getUser = routeYetNotDefined;
exports.createUser = routeYetNotDefined;
exports.updateUser = routeYetNotDefined;
exports.deleteUser = routeYetNotDefined;
