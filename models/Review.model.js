const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: {
      type: String,
    },
    user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    stroll: [{ type: Schema.Types.ObjectId, ref: "Stroll" }],
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
