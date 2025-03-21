const mongoose = require("mongoose");

const productPortfolioSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    picture: {
      type: String,
    },
    subTitle: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("productPortfolio", productPortfolioSchema);
