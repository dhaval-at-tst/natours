const express = require("express");
const tourControllers = require("./../controllers/tourControllers");

const router = express.Router();

router.param("tourId", tourControllers.paramMiddlewareExample);

router
  .route("/most-costly-5-tours")
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);

router.route("/tour-stats").get(tourControllers.getTourStats);

router
  .route("/")
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);

router
  .route("/id/:tourId")
  .get(tourControllers.getSingleTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
