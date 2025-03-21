const mongoose = require("mongoose");
const mongoUri = "mongodb+srv://Pratham99sai:Pratham99sai@pratham.cwnip.mongodb.net/farmer-link?retryWrites=true&w=majority&appName=Pratham";
// const mongoUri = "mongodb://127.0.0.1:27017/farmer-link";";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectMongoDb;
