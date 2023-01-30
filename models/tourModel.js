const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
    },
    rating: Number,
    price: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      default: 4.5,
    },
    difficulty: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

tourSchema.virtual("priceShortForm").get(function () {
  return parseInt((this.price * 1) / 500) / 2 + "K";
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
