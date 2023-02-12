const express = require("express");
const tourControllers = require("./../controllers/tourControllers");
const authControllers = require("./../controllers/authController");

const router = express.Router();

router.param("tourId", tourControllers.paramMiddlewareExample);

router
  .route("/most-costly-5-tours")
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

router.route("/tour-stats").get(tourControllers.getTourStats);

router
  .route("/")
  .get(authControllers.protect, tourControllers.getAllTours)
  .post(tourControllers.createTour);

router
  .route("/id/:tourId")
  .get(tourControllers.getSingleTour)
  .patch(tourControllers.updateTour)
  .delete(
    authControllers.protect,
    authControllers.restrictTo("admin", "lead-guide"),
    tourControllers.deleteTour
  );

module.exports = router;
