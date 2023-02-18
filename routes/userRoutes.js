const express = require("express");
const userControllers = require("./../controllers/userControllers");
const authControllers = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authControllers.signUp);
router.post("/login", authControllers.login);
router.post("/forgotPassword", authControllers.forgotPassword);
router.post("/resetPassword/:token", authControllers.resetPassword);
router.patch(
  "/updateMyPassword",
  authControllers.protect,
  authControllers.updateMyPassword
);
router.patch("/updateMe", authControllers.protect, userControllers.updateMe);
router.delete("/deleteMe", authControllers.protect, userControllers.deleteMe);

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router
  .route("/:userId")
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
