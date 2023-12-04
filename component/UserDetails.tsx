import {
  IconButton,
  Popover,
  Typography,
  Box,
  Stack,
  Button,
} from "@mui/material";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import styles from "@/styles/Header.module.css";
import { useState } from "react";

const UserDetails = () => {
  const { data, status } = useSession();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <Box>
      <IconButton
        aria-describedby={id}
        size="medium"
        sx={{
          width: "50px",
          height: "50px",
          backgroundColor: "lightblue",
          border: "1px solid black",
        }}
        onClick={handleClick}
      >
        {data?.user?.image?.length! > 0 ? (
          <Image
            src={data?.user?.image!}
            alt="user-pic"
            width={40}
            height={40}
            className={styles.userlogo}
          />
        ) : (
          <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
            {data?.user?.name?.charAt(0)}
          </Typography>
        )}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          zIndex: "111111",
        }}
      >
        <Stack>
          <Typography sx={{ p: 2 }}>{data?.user?.name}</Typography>
          <Typography sx={{ p: 2 }}>{data?.user?.email}</Typography>
          <Button sx={{ p: 2 }} onClick={() => signOut()}>
            SignOut
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
};

export default UserDetails;
