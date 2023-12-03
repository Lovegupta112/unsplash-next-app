import { Box, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import styles from "@/styles/Post.module.css";
import Post from "@/component/Post";
import { PostType } from "@/types/post";
import { useEffect } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
// import { Suspense } from "react";

export const postAtom = atom([
  {
    postId: "",
    title: "",
    tags: [""],
    img: "",
  },
]);

export const inputAtom = atom("");

const Posts = (props: { posts: PostType[] }) => {
  const { posts } = props;

  const [postList, setPostList] = useAtom(postAtom);
  const inputValue = useAtomValue(inputAtom);

  useEffect(() => {
    setPostList(posts);
  }, []);

  // let searchedPost = postList.filter((post) =>
  //   post.tags.includes(inputValue) ||
  //   post.title.toLowerCase().includes(inputValue)
  // );
  let searchedPost = postList.filter(
    (post) =>
      (post.tags.find((tag) =>
        tag.toLowerCase().includes(inputValue.toLowerCase())
      ) !== undefined
        ? true
        : false) || post.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <Box
        className={styles.main}
        sx={{
          padding: "1rem",
        }}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={4}
          sx={{
            width: "90%",
            //  border:'1px solid black',
            paddingInline: "1rem",
            margin: "auto",
          }}
        >
          {searchedPost.length > 0 ? (
            searchedPost.map((post) => (
              // <Suspense fallback={<h1>Loading post...</h1>}>
              <Post post={post} key={post.postId} />
              // </Suspense>
            ))
          ) : (
            <h1>No Post Found !</h1>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Posts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch("http://localhost:3000/api/posts");
  const data = await response.json();
  // context.res.setHeader('Cache-Control','public,s-maxage=10,stale-while-revalidate=59')
  console.log("todos data: ", data);
  return {
    props: {
      posts: data,
    },
  };
};
