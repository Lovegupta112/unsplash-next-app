import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ReactElement } from "react";

const PageNotFound = () => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        paddingTop: "8rem",
      }}
      alignItems="center"
      gap={5}
    >
      <Typography variant="h3" fontWeight="bold">
        Sorry , The page you are looking for can't be found
      </Typography>
      <Typography variant="h4" color="red" fontWeight="bold">
        404 Page
      </Typography>
      <Link href="/">
        <Button variant="contained">Back To Home</Button>
      </Link>
    </Stack>
  );
};

export default PageNotFound;

PageNotFound.getLayout = function PageLayout(page: ReactElement) {
  return <>{page}</>;
};
