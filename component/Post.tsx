import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { PostType } from "@/types/post";
// import Image from "next/image";
// import style from "@/styles/Post.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAtom } from "jotai";
import { postAtom } from "@/pages/posts";
import { deleteObject, ref, getStorage } from "firebase/storage";

const Post = ({ post }: { post: PostType }) => {
  const { postId } = post;
  const [postList, setPostList] = useAtom(postAtom);

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      setPostList(postList.filter((post) => post.postId !== postId));
      const res = await response.json();
      console.log("res: ", res);
      const storage = getStorage();
      const deleteRef = ref(storage, post.img);
      await deleteObject(deleteRef);
      console.log("Image file deleted successfully ! ");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "300px",
        // flexBasis: "29%",
        width: "30%",
        minWidth: "300px",
        "&:hover>div": {
          transform: "scale(1.04)",
        },
        "&:hover": {
          filter: "brightness(90%)",
        },
        "&:hover button": {
          visibility: "visible",
        },
        overflow: "hidden",
        position: "relative",
        borderRadius: "10px",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",

          padding: "0.4rem 1rem 0.2rem",
          // border: "1px solid red",
          backgroundImage: `url(${post.img})`,
          objectFit: "cover",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          justifyContent: "space-between",
          transition: "all 0.2s",
        }}
        className="post"
      >
        {/* <Image src={post.img} width={400} height={300} alt={`${post.title}-pic`} className={style.image}/> */}

        <IconButton
          aria-label="delete"
          sx={{
            color: "white",
            border: "1px solid white",
            width: "fit-content",
            visibility: "hidden",
            alignSelf: "end",
            position: "absolute",
            top: "20px",
            right: "25px",
            "&:hover": {
              border: "1px solid red",
              color: "red",
            },
          }}
          size="small"
          onClick={handleClick}
        >
          <DeleteIcon />
        </IconButton>
        <Stack
          py={2}
          gap={2}
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "20px",
          }}
        >
          {/* <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "1.5rem",
              color: "white",
              textShadow: "4px 4px 5px black",
            }}
          >
            {post.title}
          </Typography> */}
          <Stack
            direction="row"
            gap={2}
            sx={{
              flexWrap: "wrap",
            }}
          >
            {post.tags.length > 0 &&
              post.tags.map((tag, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    backgroundColor: "rgba(82, 82, 82, 0.37)",
                    "&:hover": {
                      color: "white",
                      borderColor: "white",
                      backgroundColor: "black",
                    },
                  }}
                >
                  {tag}
                </Button>
              ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Post;
