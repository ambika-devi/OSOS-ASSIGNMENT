const mongoose = require("mongoose");

const DB_URI = `mongodb+srv://<${DB_USERNAME}>:<${process.env.DB_PASSWORD}>@<${process.env.MONOGO_CLUSTER}>/<restaurantDb>`;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;