import mongoose from "mongoose";
import colors from "colors";

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB connected on: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.log("Error: ", err.message.red);
    process.exit(1);
  }
};

export default connectDB;
