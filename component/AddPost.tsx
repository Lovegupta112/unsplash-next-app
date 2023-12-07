import { useState } from "react";
import { storage } from "@/dbconfig/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  Stack,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { postAtom } from "@/pages/posts";
import { useSession } from "next-auth/react";

type PostType = {
  postId: string;
  title: string;
  tags: string[];
  img: File | undefined;
};

const defaultPost = {
  postId: "",
  title: "",
  tags: [""],
  img: undefined,
};

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<PostType>(defaultPost);
  const [postList, setPostList] = useAtom(postAtom);
  const { data, status } = useSession();
  // console.log('session: ',data,status);
  // const router=useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPost(defaultPost);
  };

  const uploadImage = async () => {
    if (post.img === undefined) return;
    const imageRef = ref(storage, `images/${post.img.name + v4()}`);
    const res = await uploadBytes(imageRef, post.img);
    //  console.log('Image uploaded: ',res);
    return await getDownloadURL(imageRef);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    if (name === "title") {
      setPost({ ...post, title: value });
    } else if (name === "tags") {
      setPost({ ...post, tags: value.split(",") });
    } else if (name === "image") {
      setPost({ ...post, img: e.target.files?.[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post.title.trim() || post.tags.length <= 0 || !post.img) {
      alert("please fill all the feilds !");
      return;
    }

    try {
      const postId = v4();
      const imageUrl = await uploadImage();


      setPost({ ...post, postId });
      const userResp=await fetch(`/api/users/${data?.user?.email}`);
      const userData=await userResp.json();
      setPostList([
        ...postList,
        {
          ...post,
          postId,
          img: imageUrl || "",
          userId:{...userData}
        },
      ]);

      //  console.log('userData: ',userData,userData._id);
      

      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          ...post,
          postId,
          img: imageUrl,
          userId: userData._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const createdData = await response.json();
      // console.log("created: ", createdData);
      alert("Post has Created SuccessFully !");
      setOpen(false);
      // router.replace(router.asPath);
      setPost(defaultPost);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#009b3e",
          color: "white",
          border: "none",
          "&:hover": {
            border: "none",
            backgroundColor: "#3DB46D",
          },
        }}
      >
        Add a Photo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new photo</DialogTitle>
        <DialogContent>
          <Stack
            component="form"
            sx={{
              width: "500px",
            }}
            gap={4}
          >
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              fullWidth
              type="text"
              name="title"
              placeholder="Post Title"
              value={post.title}
              onChange={(e) =>
                handleChange(e as React.ChangeEvent<HTMLInputElement>)
              }
            />

            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              fullWidth
              type="text"
              name="tags"
              placeholder="Seprate tags with Commas"
              value={post.tags.join(",")}
              onChange={(e) =>
                handleChange(e as React.ChangeEvent<HTMLInputElement>)
              }
            />

            <TextField
              variant="standard"
              autoFocus
              fullWidth
              type="file"
              name="image"
              placeholder="Upload Image"
              onChange={(e) =>
                handleChange(e as React.ChangeEvent<HTMLInputElement>)
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
