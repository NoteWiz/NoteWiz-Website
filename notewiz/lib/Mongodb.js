import mongoose from "mongoose";

const connect = async () => {
  const uri =
    "mongodb+srv://Juwairia:070898@cluster0.pghgbgz.mongodb.net/registered_users";
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
