import { useState } from "react";
import { Button, Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { PostType } from "@/types/post";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PostView({ post }: { post: PostType }) {
  const [open, setOpen] = useState(false);

  const { postId, userEmail, title, tags, img } = post;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        onClick={handleClickOpen}
        sx={{
          width: "100%",
          position: "absolute",
          height: "100%",
          top: "0",
          zIndex: "999",
        }}
      ></Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          zIndex: "3333333",
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: "bold", textTransform: "capitalize" }}
          id="customized-dialog-title"
        >
          <Typography sx={{ padding: "1rem", fontSize: "2rem" }}>
            {title}
          </Typography>
          <Stack
            direction="row"
            gap={2}
            sx={{
              flexWrap: "wrap",
            }}
          >
            {tags.length > 0 &&
              tags.map((tag, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  sx={{
                    color: "white",
                    border: "1px solid white",
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
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
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack justifyContent="center" alignItems="center">
            <Image src={img} width={600} height={450} alt={title + "-pic"} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack>
            <Typography
              sx={{
                width: "100%",
                textAlign: "end",
                paddingRight: "1rem",
                fontWeight: "bold",
              }}
            >
              Uploaded By
            </Typography>
            <Stack
              justifyContent="flex-end"
              alignItems="center"
              direction="row"
              gap={1}
            >
              <AccountCircleIcon />
              {userEmail}
            </Stack>
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
