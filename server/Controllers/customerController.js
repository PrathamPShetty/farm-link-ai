const customerSchema = require("../Models/Customer");
const customerFeedbackSchema = require("../Models/customerFeedback");
const productSchema = require("../Models/Product");
const productPortfolioSchema = require("../Models/ProductPortfolio");
const favoriteSchema = require("../Models/Favorite");
const orderSchema = require("../Models/Order");

const secretKey = "farmLink";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Favorite = require("../Models/Favorite");

const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const check = await customerSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCustomer = await new customerSchema({
        name,
        email,
        phone,
        password: hashedPassword,
        status: "Active",
      }).save();
      res.json({ success: true, message: "Registered successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await customerSchema.findOne({ email });
    if (!customer) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (customer?.status == "Blocked") {
          res.json({
            success: false,
            message: "Your account has been blocked",
          });
        } else {
          const token = jwt.sign(customer.id, secretKey);
          res.json({ success: true, message: "Login successfully", token });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const customer = await customerSchema.findById(req.customer);
    if (!customer) {
      console.log("Customer not found");
      res.json({ success: false, message: "Customer not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const customer = await customerSchema.findById(req.customer);
    if (!customer) {
      res.json({ success: false, message: "Account not found!" });
    } else {
      const { name, phone, password } = req.body;
      const profile = req?.file?.filename;
      const updatedCustomer = {};
      if (name) updatedCustomer.name = name;
      if (phone) updatedCustomer.phone = phone;
      if (profile) updatedCustomer.profile = profile;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedCustomer.password = hashedPassword;
      }
      await customerSchema.findByIdAndUpdate(
        req.customer,
        { $set: updatedCustomer },
        { new: true }
      );
      res.json({ success: true, message: "Profile updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const customerFeedback = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const newFeedback = await new customerFeedbackSchema({
      name,
      email,
      phone,
      subject,
      message,
    }).save();
    res.json({
      success: true,
      message: "Thank you for your feedback!",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const viewAllProducts = async (req, res) => {
  try {
    const products = await productSchema.find({ status: "Available" });
    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewSingleProduct = async (req, res) => {
  try {
    const product = await productSchema
      .findById(req.params.id)
      .populate("farmer");
    const productPortFolio = await productPortfolioSchema.find({
      product: req.params.id,
    });
    if (!product) {
      res.json({ success: false, message: "Product does not exists!" });
    } else {
      const checkProductInFavorite = await favoriteSchema.findOne({
        farmer: req.farmer,
        product: req.params.id,
      });
      res.json({
        success: true,
        product: {
          product,
          productPortFolio,
          isFavorite: checkProductInFavorite ? true : false,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const manageFavorite = async (req, res) => {
  try {
    const checkProduct = await favoriteSchema.findOne({
      customer: req.customer,
      product: req.params.id,
    });

    if (checkProduct) {
      await favoriteSchema.findByIdAndDelete(checkProduct?._id);
      res.json({ success: true, message: "Product removed!" });
    } else {
      const newProductIntoFavorites = await new favoriteSchema({
        product: req.params.id,
        customer: req.customer,
      }).save();
      res.json({
        success: true,
        message: "product added to favorite!",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewFavorites = async (req, res) => {
  try {
    const checkProductsInFavorite = await favoriteSchema
      .find({
        customer: req.customer,
      })
      .populate({
        path: "product",
        populate: {
          path: "farmer", // The field inside the `product` schema you want to populate
          model: "farmer", // The model name of the farmer schema
        },
      });
    res.json({
      success: true,
      favorites: checkProductsInFavorite,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const orderProduct = async (req, res) => {
  try {
    const {
      product,
      name,
      phone,
      email,
      price,
      quantity,
      total,
      address,
      location,
      city,
      pin,
      paymentMethod,
    } = req.body;
    const newOrder = await new orderSchema({
      product,
      customer: req.customer,
      name,
      phone,
      email,
      price,
      quantity,
      total,
      address,
      location,
      city,
      pin,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Placed",
    }).save();
    res.json({
      success: true,
      message: "Order has been placed!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const viewOrders = async (req, res) => {
  try {
    const orders = await orderSchema.find({ customer: req.customer });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const order = await orderSchema.findById(req.params.id);
    if (!order) {
      res.json({
        success: true,
        message: "Order not found",
      });
    } else {
      const updatedOrder = {};
      updatedOrder.orderStatus = "Cancelled";
      await orderSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedOrder },
        { new: true }
      );
      res.json({
        success: true,
        message: "Order not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateOrder = async (req, res) => {
  try {
    const checkOrder = await orderSchema.findById(req.params.id);
    if (!checkOrder) {
      res.json({ success: false, message: "Order not found!" });
    } else {
      const { transactionId, paymentStatus, feedback, ratings } = req.body;
      const updatedOrderData = {};
      if (paymentStatus) updatedOrderData.paymentStatus = paymentStatus;
      if (transactionId) updatedOrderData.transactionId = transactionId;
      if (feedback) updatedOrderData.feedback = feedback;
      if (ratings) updatedOrderData.ratings = ratings;
      await orderSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedOrderData },
        { new: true }
      );
      res.json({ success: true, message: "Order updated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

module.exports = {
  Register,
  Login,
  getProfile,
  customerFeedback,
  updateProfile,
  viewAllProducts,
  viewSingleProduct,
  manageFavorite,
  viewFavorites,
  orderProduct,
  viewOrders,
  cancelOrder,
  updateOrder,
};
