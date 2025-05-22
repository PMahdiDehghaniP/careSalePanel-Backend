const mongoose = require("mongoose");

const connectToDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Cant Connect Error : ", error);
    process.exit(0);
  }
};

module.exports = { connectToDataBase };
