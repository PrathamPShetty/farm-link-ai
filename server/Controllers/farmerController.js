const farmerSchema = require("../Models/Farmer");
const productSchema = require("../Models/Product");
const productPortfolioSchema = require("../Models/ProductPortfolio");
const orderSchema = require("../Models/Order");
const secretKey = "farmLink";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { aadhaarNumber, password } = req.body;
    const farmer = await farmerSchema.findOne({ aadhaarNumber });
    if (!farmer) {
      console.log("Aadhaar not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, farmer.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        if (farmer?.status == "Blocked") {
          res.json({
            success: false,
            message: "Your account has been blocked",
          });
        } else {
          const token = jwt.sign(farmer.id, secretKey);
          res.json({ success: true, message: "Login successfully", token });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const RegisterFarmer = async (req, res) => {
  try {
    const { name, phone, email, aadhaarNumber, password } = req.body;
    const check = await farmerSchema.findOne({ aadhaarNumber });
    if (check) {
      res.json({ success: false, message: "Farmer info already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newFarmer = await new farmerSchema({
        name,
        phone,
        email,
        aadhaarNumber,
        password: hashedPassword,
        status: "Active",
      }).save();
      res.json({
        success: true,
        message: "Farmer information inserted successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const farmer = await farmerSchema.findById(req.farmer);
    if (!farmer) {
      console.log("Farmer not found");
      res.json({ success: false, message: "Farmer not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        farmer,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getCounts = async (req, res) => {
  try {
    const products = await productSchema.find({ farmer: req?.farmer });
    const checkOrder = await orderSchema
      .find()
      .populate("customer")
      .populate({
        path: "product", // Populate the product field
        populate: {
          path: "farmer", // Populate the farmer field within the product
        },
      });
    const orders = checkOrder.filter((item) => {
      return item?.product?.farmer?._id.toString() === req.farmer.toString();
    });
    const uniqueCustomers = new Set();
    const uniqueOrders = checkOrder.filter((item) => {
      const customerId = item?.customer?._id?.toString();
      const isFarmerMatch =
        item?.product?.farmer?._id.toString() === req.farmer.toString();

      // Include the order only if the customer is unique and the farmer matches
      if (isFarmerMatch && customerId && !uniqueCustomers.has(customerId)) {
        uniqueCustomers.add(customerId);
        return true; // Include this order in the result
      }
      return false; // Skip this order
    });
    const totalAmount = orders.reduce((sum, order) => {
      return sum + Number(order.total || 0); // Ensure conversion to a number
    }, 0);
    res.json({
      success: true,
      orders: orders?.length,
      products: products?.length,
      customers: uniqueOrders?.length,
      revenue: totalAmount,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const farmer = await farmerSchema.findById(req.farmer);
    if (!farmer) {
      res.json({ success: false, message: "Account not found!" });
    } else {
      const { phone, email, password } = req.body;
      const profile = req?.file?.filename;
      const updatedFarmer = {};
      if (phone) updatedFarmer.phone = phone;
      if (email) updatedFarmer.email = email;
      if (profile) updatedFarmer.profile = profile;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedFarmer.password = hashedPassword;
      }
      await farmerSchema.findByIdAndUpdate(
        req.farmer,
        { $set: updatedFarmer },
        { new: true }
      );
      res.json({ success: true, message: "Profile updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const insertProduct = async (req, res) => {
  try {
    const { title, price, unit, unitOfMeasure, description } = req.body;
    const picture = req?.file?.filename;
    const checkProduct = await productSchema.findOne({
      title,
      farmer: req?.farmer,
    });
    if (checkProduct) {
      res.json({ success: false, message: "Product already exists!" });
    } else {
      const newProduct = await new productSchema({
        farmer: req?.farmer,
        title,
        price,
        unit,
        unitOfMeasure,
        description,
        picture,
        status: "Available",
      }).save();
      res.json({ success: true, message: "Product added!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const checkProduct = await productSchema.findById(req.params.id);
    if (!checkProduct) {
      res.json({ success: false, message: "Product does not exists!" });
    } else {
      const { title, price, unit, unitOfMeasure, description, status } =
        req.body;
      
      const updatedInfo = {};
      if (title) updatedInfo.title = title;
      if (price) updatedInfo.price = price;
      if (unit) updatedInfo.unit = unit;
      if (unitOfMeasure) updatedInfo.unitOfMeasure = unitOfMeasure;
      if (description) updatedInfo.description = description;
     
      if (status) updatedInfo.status = status;
      await productSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: updatedInfo,
        },
        { new: true }
      );
      res.json({ success: true, message: "Product updated!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await productSchema.find({ farmer: req?.farmer });
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const uploadProductPortFolio = async (req, res) => {
  try {
    const { product, subTitle } = req.body;
    const picture = req?.file?.filename;
    const newProductPortFolio = await new productPortfolioSchema({
      product,
      subTitle,
      picture,
    }).save();
    res.json({ success: true, message: "Portfolio posted!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const deleteProductFolio = async (req, res) => {
  try {
    const checkPost = await productPortfolioSchema.findById(req.params.id);
    if (!checkPost) {
      res.json({ success: false, message: "Post does not exists!" });
    } else {
      await productPortfolioSchema.findByIdAndDelete(req.params.id);
      res.json({ success: true, message: "Post removed!" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProductPortFolio = async (req, res) => {
  try {
    const checkProduct = await productSchema.findById(req.params.id);
    if (!checkProduct) {
      res.json({ success: false, message: "Product does not exists!" });
    } else {
      const posts = await productPortfolioSchema.find({
        product: req.params.id,
      });
      res.json({ success: true, posts: { posts, product: checkProduct } });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getOrders = async (req, res) => {
  try {
    const checkOrder = await orderSchema
      .find()
      .populate("customer")
      .populate({
        path: "product", // Populate the product field
        populate: {
          path: "farmer", // Populate the farmer field within the product
        },
      });
    const orders = checkOrder.filter((item) => {
      return item?.product?.farmer?._id.toString() === req.farmer.toString();
    });
    res.json({ success: true, orders });
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
      const { orderStatus, paymentStatus } = req.body;
      const qrCode = req?.file?.filename;
      const updatedOrderData = {};
      if (orderStatus) updatedOrderData.orderStatus = orderStatus;
      if (paymentStatus) updatedOrderData.paymentStatus = paymentStatus;
      if (qrCode) updatedOrderData.qrCode = qrCode;
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
  Login,
  RegisterFarmer,
  getProfile,
  updateProfile,
  insertProduct,
  getAllProducts,
  updateProduct,
  uploadProductPortFolio,
  deleteProductFolio,
  getProductPortFolio,
  getOrders,
  updateOrder,
  getCounts,
};
