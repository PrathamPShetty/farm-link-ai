const express = require("express");
const router = express.Router();
const multer = require("multer");
const { VerifyFarmerToken } = require("../Middleware/authFarmer");
const {
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
} = require("../Controllers/farmerController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/farmer");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//product
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/farmer/product");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadProduct = multer({ storage: productStorage });

router.post("/Register", RegisterFarmer);
router.post("/Login", Login);
router.get("/getProfile", VerifyFarmerToken, getProfile);
router.get("/getCounts",
   VerifyFarmerToken,
    getCounts);
router.put(
  "/updateProfile",
  VerifyFarmerToken,
  upload.single("profile"),
  updateProfile
);
//products
router.post(
  "/insertProduct",
  VerifyFarmerToken,
  uploadProduct.single("picture"),
  insertProduct
);
router.put(
  "/updateProduct/:id",
  VerifyFarmerToken,
  uploadProduct.single("picture"),
  updateProduct
);
router.get("/getAllProducts", VerifyFarmerToken, getAllProducts);
//ProductPortFolio
router.post(
  "/uploadProductPortFolio",
  VerifyFarmerToken,
  uploadProduct.single("picture"),
  uploadProductPortFolio
);
router.delete("/deleteProductFolio/:id", 
  VerifyFarmerToken,
   deleteProductFolio);
router.get("/getProductPortFolio/:id", 
  VerifyFarmerToken, 
  getProductPortFolio);
router.get("/getOrders", 
  VerifyFarmerToken, 
  getOrders);
router.put(
  "/updateOrder/:id",
  // VerifyFarmerToken,
  upload.single("qrCode"),
  updateOrder
);

module.exports = router;
