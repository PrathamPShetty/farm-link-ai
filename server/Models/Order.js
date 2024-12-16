const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    product: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "product",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
    },
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    quantity: {
      type: String,
      require: true,
    },
    total: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    pin: {
      type: String,
      require: true,
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    qrCode: {
      type: String,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    paymentStatus: {
      type: String,
      require: true,
    },
    orderStatus: {
      type: String,
      require: true,
    },
    feedback: {
      type: String,
      require: true,
    },
    ratings: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("order", orderSchema);
