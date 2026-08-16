const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
};