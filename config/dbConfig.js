const mongoos = require("mongoose");
const connectDB = async () => {
  try {
    const connect = await mongoos.connect(process.env.MONGOOSE_CONNECT);
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
