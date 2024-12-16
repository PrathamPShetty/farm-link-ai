const express = require("express");
const router = express.Router();
const multer = require("multer");
const { VerifyCustomerToken } = require("../Middleware/authCustomer");
const {
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
} = require("../Controllers/customerController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/customer");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/Register", Register);
router.post("/Login", Login);
router.post("/customerFeedback", customerFeedback);
router.get("/getProfile", VerifyCustomerToken, getProfile);
router.put(
  "/updateProfile",
  VerifyCustomerToken,
  upload.single("profile"),
  updateProfile
);
router.get("/viewAllProducts", viewAllProducts);
router.get("/viewSingleProduct/:id", viewSingleProduct);
router.post("/manageFavorite/:id", VerifyCustomerToken, manageFavorite);
router.get("/viewFavorites", VerifyCustomerToken, viewFavorites);
router.post("/orderProduct", VerifyCustomerToken, orderProduct);
router.get("/viewOrders", VerifyCustomerToken, viewOrders);
router.put("/cancelOrder/:id", VerifyCustomerToken, cancelOrder);
router.put("/updateOrder/:id", VerifyCustomerToken, updateOrder);

module.exports = router;
