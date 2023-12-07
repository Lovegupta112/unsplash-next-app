import { atom, useAtomValue, useAtom } from "jotai";
import { useEffect } from "react";
import { postAtom } from "./index";
import { Box, Stack } from "@mui/material";
import styles from "@/styles/Post.module.css";
import Post from "@/component/Post";
import { GetServerSideProps } from "next";
import { PostType } from "@/types/post";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { inputAtom } from "@/component/Header";
import Head from "next/head";

export const userEmailAtom = atom("");

const UserPost = (props: { posts: PostType[] }) => {
  // const posts=useAtomValue(postAtom);
  // console.log('posts: ',posts);

  const { posts } = props;
  const [postList, setPostList] = useAtom(postAtom);
  const userEmailValue = useAtomValue(userEmailAtom);
  const inputValue = useAtomValue(inputAtom);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      const email = data.user?.email;
      setPostList(posts.filter((post) => post.userId.email === email));
    }
  }, [router, status]);

  // let searchedPost=posts.filter((post)=>post.userEmail===userEmailValue);
  let searchedPost = postList.filter(
    (post) =>
      (post.tags.find((tag) =>
        tag.toLowerCase().includes(inputValue.toLowerCase())
      ) !== undefined
        ? true
        : false) || post.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  if (userEmailValue.length > 0) {
    searchedPost = searchedPost.filter(
      (post) => post.userId.email === userEmailValue
    );
  }
  return (
    <>
      <Head>
        <title>User Post</title>
        <meta name="description" content="This page contains user's post" />
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
            //  border:'1px solid black',
            paddingInline: "1rem",
            margin: "auto",
          }}
        >
          {searchedPost.length > 0 ? (
            searchedPost.map((post) => <Post post={post} key={post.postId} />)
          ) : (
            <h1>No Post Found !</h1>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default UserPost;

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
