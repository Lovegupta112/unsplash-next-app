import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { ReactElement } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import UserDetails from "@/component/UserDetails";
import Head from "next/head";
export default function Home() {
  const session = useSession();


  const handleClick = () => {
    if (session.status === "unauthenticated") {
      signIn("google");
    } else {
      return null;
    }
  };

  return (
    <>
      <Head>
        <title>Unsplash NextJS App</title>
        <meta
          name="description"
          content="This Website is Collection Of various High Quality Images "
        />
        <meta name="keywords" content="images,animals,houses,nature,stylish" />
      </Head>
      <Stack className={styles.container} gap={3} sx={{ padding: "1rem" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          paddingInline={3}
          alignItems="center"
        >
          <Image
            src="/Unsplash_Logo.svg"
            height={100}
            width={70}
            alt="unsplash-logo"
          />
          {session.status === "authenticated" && <UserDetails />}
        </Stack>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Capturing Moments, Creating Memories
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", textAlign: "center", color: "grey" }}
        >
          {" "}
          Where Every Pixel Tells a Story{" "}
        </Typography>
        <Link
          href={session.status === "unauthenticated" ? "/" : "/posts"}
          className={styles.link}
        >
          <Button
            variant="contained"
            sx={{
              width: "fit-content",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "grey",
              },
            }}
            size="large"
            onClick={handleClick}
          >
            {session.status === "unauthenticated"
              ? "SignIn With Google"
              : "Explore More"}
          </Button>
        </Link>
      </Stack>
    </>
  );
}

Home.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
