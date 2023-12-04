import { NextApiResponse, NextApiRequest } from "next";
import Post from "@/models/post";
import connectDB from "@/dbconfig/db";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();
    //  await Post.createCollection();
    // console.log(req.method);
    switch (req.method) {
      case "GET":
        let posts = await Post.find();
        res.status(200).json(posts);
        break;
      case "POST":
        console.log('body: ',req.body);
        const { postId, userEmail, title, tags, img } = req.body;
        const newPost = new Post({
          postId,
          userEmail,
          title,
          tags,
          img,
        });
        newPost.save();
        res.status(201).json({ message: "Post has Creted !", newPost });
        break;
      default:
        res.status(405).json({ error: "Unsupported Http Method" });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default handler;

// export const api = {
//   externalResolver: true,
// };
