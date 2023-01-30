const { query } = require("express");
const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = "-price";
  req.query.fields = "name,price,ratings";
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    console.log("getAllTours_query", req.query);

    // BUILD QUERY
    // // 1A) Filtering
    // const queryObj = { ...req.query };
    // const fieldsToBeExclude = ["page", "sort", "limit", "fields"];
    // fieldsToBeExclude.forEach((field) => delete queryObj[field]);

    // // 1B) Advanced filtering
    // let queryStr = JSON.stringify(queryObj);

    // // Add $ before gt,gte,lt,lte
    // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    // let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   query.sort(sortBy);
    // } else {
    //   query.sort("-createdAt");
    // }

    // 3) Field Limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   query = query.select(fields);
    // } else {
    //   query = query.select("-__v");
    // }

    // 4) Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // // Check existence of requested page
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("This page does not exist");
    // }

    // query = query.skip(skip).limit(limit);

    // EXECUTION
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getSingleTour = async (req, res) => {
  try {
    const tourId = req?.params?.tourId;

    const tour = await Tour.findById(tourId);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newTour,
      },
    });
  } catch (error) {
    console.log("Opps! failed to create document.", `Error: ${error.message}`);

    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tourId = req?.params?.tourId;

    const tour = await Tour.findByIdAndUpdate(tourId, req.body, { new: true });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tourId = req?.params?.tourId;

    await Tour.findByIdAndDelete(tourId);

    res.status(202).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.paramMiddlewareExample = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.getTourStats = async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      // {
      //   $match: {
      //     ratings: { $gte: 4.5 },
      //   },
      // },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          num: { $sum: 1 },
          avgRatings: { $avg: "$ratings" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
  next();
};
