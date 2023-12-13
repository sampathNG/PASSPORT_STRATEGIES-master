const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(
      //   "mongodb+srv://kumar:passwords@cluster0.gunh9to.mongodb.net/?retryWrites=true&w=majority",
      "mongodb+srv://ramuksampath5:passwords@cluster0.e7xxtq9.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
// connectDB();
module.exports = connectDB;
