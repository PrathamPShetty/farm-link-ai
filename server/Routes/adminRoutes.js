const express = require("express");
const router = express.Router();
const multer = require("multer");
const { VerifyAdminToken } = require("../Middleware/authAdmin");
const {
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
} = require("../Controllers/adminController");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/admin");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/Register", Register);
router.post("/Login", Login);
router.get("/getProfile", VerifyAdminToken, getProfile);
router.put(
  "/updateProfile",
  VerifyAdminToken,
  upload.single("profile"),
  updateProfile
);
router.get("/getAllFarmers", VerifyAdminToken, getAllFarmers);
router.put("/updateFarmerStatus/:id", VerifyAdminToken, updateFarmerStatus);
router.get("/getAllCustomers", VerifyAdminToken, getAllCustomers);
router.put("/updateCustomerStatus/:id", VerifyAdminToken, updateCustomerStatus);
router.get("/getCounts", VerifyAdminToken, getCounts);
router.get("/getCustomerFeedback", VerifyAdminToken, getCustomerFeedback);
module.exports = router;
