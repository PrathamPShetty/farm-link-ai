const jwt = require("jsonwebtoken");
const secretKey = "farmLink";

const VerifyFarmerToken = async (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.json({
      success: false,
      message: "Please authenticate using valid token",
    });
  }
  try {
    const storeId = jwt.verify(token, secretKey);
    req.farmer = storeId;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { VerifyFarmerToken };
