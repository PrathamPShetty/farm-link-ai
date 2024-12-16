const express = require("express");
const connectMongoDb = require("./db");
const cors = require("cors");
connectMongoDb();
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());


app.use('/Uploads', express.static(path.join(__dirname, 'public')))
//customer
app.use("/api/customer", require("./Routes/customerRoutes"));
app.use("/api/uploads/customer", express.static(path.join(__dirname, "./Uploads/customer")));
app.use(
  "/api/uploads/customer/getImagesFromAdmin",
  express.static(path.join(__dirname, "./Uploads/admin"))
);
app.use(
  "/api/uploads/customer/getImagesFromFarmer",
  express.static(path.join(__dirname, "./Uploads/farmer"))
);
app.use(
  "/api/uploads/customer/getImagesOfProduct",
  express.static(path.join(__dirname, "./Uploads/farmer/product"))
);

//farmer
app.use("/api/farmer", require("./Routes/farmerRoutes"));
app.use("/api/uploads/farmer", express.static(path.join(__dirname, "./Uploads/farmer")));
app.use("/api/uploads/farmer/product", express.static(path.join(__dirname, "./Uploads/farmer/product")));
app.use(
  "/api/uploads/farmer/getImagesFromAdmin",
  express.static(path.join(__dirname, "./Uploads/admin"))
);

//admin
app.use("/api/admin", require("./Routes/adminRoutes"));
app.use("/api/uploads/admin", express.static(path.join(__dirname, "./Uploads/admin")));
app.use(
  "/api/uploads/admin/getImagesFromCustomer",
  express.static(path.join(__dirname, "./Uploads/customer"))
);
app.use(
  "/api/uploads/admin/getImagesFromFarmer",
  express.static(path.join(__dirname, "./Uploads/farmer"))
);

const PORT = 7000;
const IP = "0.0.0.0";
app.listen(PORT,IP,() => {
  console.log(`Server is running on port ${PORT}`);
});
