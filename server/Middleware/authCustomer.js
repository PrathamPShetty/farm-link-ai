const jwt = require("jsonwebtoken");
const secretKey = "farmLink";

const VerifyCustomerToken = async (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    return res.json({
      success: false,
      message: "Please authenticate using valid token",
    });
  }
  try {
    const customerId = jwt.verify(token, secretKey);
    req.customer = customerId;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { VerifyCustomerToken };
