import { Box, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";
import styles from "@/styles/Post.module.css";
import Post from "@/component/Post";
import { PostType } from "@/types/post";
import { useEffect } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
// import { Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { inputAtom } from "@/component/Header";
import Head from "next/head";

export const postAtom = atom([
  {
    postId: "",
    userEmail: "",
    title: "",
    tags: [""],
    img: "",
  },
]);

const Posts = (props: { posts: PostType[] }) => {
  const { posts } = props;

  const [postList, setPostList] = useAtom(postAtom);
  const inputValue = useAtomValue(inputAtom);

  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.replace("/");
  }

  useEffect(() => {
    setPostList(posts);
  }, []);

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
      <Head>
        <title>All Posts</title>
        <meta name="description" content="This page contains All Images " />
        <meta name="keywords" content="images,animals,houses,nature,stylish" />
      </Head>
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
