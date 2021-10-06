const mongoose = require("mongoose");
const db = '<mongodb-connection-url>';

// connect DB method
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB connected");
  } catch (err) {
    console.log("Unable to connect DB");
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
