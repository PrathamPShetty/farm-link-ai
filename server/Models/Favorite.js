const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("favorite", favoriteSchema);
