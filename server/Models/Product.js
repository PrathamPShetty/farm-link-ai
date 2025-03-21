const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "farmer",
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    unit: {
      type: String,
      require: true,
    },
    unitOfMeasure: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("product", productSchema);
