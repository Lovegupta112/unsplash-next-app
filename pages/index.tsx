import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { ReactElement } from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack className={styles.container} gap={3} sx={{ padding: "1rem" }}>
      <Image
        src="/Unsplash_Logo.svg"
        height={100}
        width={70}
        alt="unsplash-logo"
      />
      <Typography variant="h2" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Capturing Moments, Creating Memories
      </Typography>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", textAlign: "center", color: "grey" }}
      >
        {" "}
        Where Every Pixel Tells a Story{" "}
      </Typography>
      <Link href="/posts" className={styles.link}>
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
        >
          Explore More
        </Button>
      </Link>
    </Stack>
  );
}

Home.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
