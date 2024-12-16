const adminSchema = require("../Models/Admin");
const farmerSchema = require("../Models/Farmer");
const customerSchema = require("../Models/Customer");
const customerFeedbackSchema = require("../Models/customerFeedback");

const secretKey = "farmLink";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const check = await adminSchema.findOne({ email });
    if (check) {
      res.json({ success: false, message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await new adminSchema({
        username,
        email,
        password: hashedPassword,
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
    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      console.log("Email not found");
      res.json({ success: false, message: "Invalid credential!" });
    } else {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        console.log("Password is incorrect");
        res.json({ success: false, message: "Invalid credential!" });
      } else {
        const token = jwt.sign(admin.id, secretKey);
        res.json({ success: true, message: "Login successfully", token });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getProfile = async (req, res) => {
  try {
    const admin = await adminSchema.findById(req.admin);
    if (!admin) {
      console.log("Admin not found");
      res.json({ success: false, message: "Admin not found" });
    } else {
      res.json({
        success: true,
        message: "Profile fetched successfully",
        admin,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const admin = await adminSchema.findById(req.admin);
    if (!admin) {
      res.json({ success: false, message: "Account not found!" });
    } else {
      const { name, email, password } = req.body;
      const profile = req?.file?.filename;
      const updatedAdmin = {};
      if (name) updatedAdmin.name = name;
      if (email) updatedAdmin.email = email;
      if (profile) updatedAdmin.profile = profile;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedAdmin.password = hashedPassword;
      }
      await adminSchema.findByIdAndUpdate(
        req.farmer,
        { $set: updatedAdmin },
        { new: true }
      );
      res.json({ success: true, message: "Profile updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllFarmers = async (req, res) => {
  try {
    const farmers = await farmerSchema.find();
    res.json({
      success: true,
      farmers,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const updateFarmerStatus = async (req, res) => {
  try {
    var check = await farmerSchema.findById(req.params.id);
    if (!check) {
      res.json({ success: false, message: "Farmer does not exists!" });
    } else {
      const { status } = req.body;
      const updatedFarmer = {};
      if (status) {
        updatedFarmer.status = status;
      }
      check = await farmerSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedFarmer },
        { new: true }
      );
      res.json({
        success: true,
        message: "Farmer status updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerSchema.find();
    res.json({
      success: true,
      customers,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const updateCustomerStatus = async (req, res) => {
  try {
    var customer = await customerSchema.findById(req.params.id);
    if (!customer) {
      res.json({
        success: false,
        message: "Customer not found!",
      });
    } else {
      const { status } = req.body;
      const updatedCustomer = {};
      if (status) {
        updatedCustomer.status = status;
      }
      customer = await customerSchema.findByIdAndUpdate(
        req.params.id,
        { $set: updatedCustomer },
        { new: true }
      );
      res.json({
        success: true,
        message: "Customer status updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};

const getCounts = async (req, res) => {
  try {
    const farmers = await farmerSchema.find({ status: "Active" });
    const customers = await customerSchema.find({ status: "Active" });
    res.json({
      success: true,
      farmers: farmers.length,
      customers: customers.length,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
const getCustomerFeedback = async (req, res) => {
  try {
    const feedbacks = await customerFeedbackSchema.find();
    res.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Some internal error!" });
  }
};
module.exports = {
  Register,
  Login,
  getProfile,
  updateProfile,
  getAllFarmers,
  updateFarmerStatus,
  getAllCustomers,
  updateCustomerStatus,
  getCounts,
  getCustomerFeedback,
};
