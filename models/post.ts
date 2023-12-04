// import { Binary } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  img: {
    type: String,
    required: true,
  },
});

const Post =
  mongoose.models.Post || mongoose.model("Post", postSchema, "unsplash");

export default Post;
