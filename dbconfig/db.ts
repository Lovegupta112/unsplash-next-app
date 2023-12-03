import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    const connection = mongoose.connection;
    
    connection.once("open", () => {
      console.log("Connetcted to Mongodb SuccessFully !");
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default connectDB;
