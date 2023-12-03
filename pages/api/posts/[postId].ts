import { NextApiResponse, NextApiRequest } from "next";
import Post from "@/models/post";
import connectDB from "@/dbconfig/db";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}


const handler=async(req:NextApiRequest,res:NextApiResponse)=>{
  try{
    await connectDB();
     if(req.method==='DELETE'){
         const {postId}=req.query;
         console.log('postId: ',postId);
         const deletedPost=await Post.deleteOne({postId});
         res.status(200).json({message:'Post has Deleted !',deletedPost});
     }
     else{
        res.status(405).json({ error: "Unsupported Http Method" });
     }
  }
  catch(error){
    console.log('Error: ',error);
  }
}

export default handler;