import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User =
  mongoose.models.User || mongoose.model("User", userSchema, "unsplashUsers");

export default User;
