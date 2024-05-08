import mongoose from "mongoose";
import {DB_NAME} from "./constants"
const connect = async () => {
  const uri =`${process.env.MONGODB_URI}/${DB_NAME}`;
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB Connection successfully established.");
  } catch (error) {
    console.error("Error connecting to Mongoose:", error);
    throw new Error("Error connecting to Mongoose");
  }
};


export default connect;
