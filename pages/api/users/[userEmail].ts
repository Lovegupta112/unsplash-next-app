import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import connectDB from "@/dbconfig/db";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();
    switch (req.method) {
      case "GET":
        const userEmail = req.query.userEmail;
        // console.log('query: ',userEmail);
        let user = await User.findOne({ email: userEmail });
        res.status(200).json(user);
        break;
      case "POST":
        const { email, name } = req.body;
        const newUser = new User({
          email,
          name,
        });
        newUser.save();
        res.status(201).json({ message: "User has created !", newUser });
        break;
      default:
        res.status(405).json({ error: "Unsupported Http Method" });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default handler;
