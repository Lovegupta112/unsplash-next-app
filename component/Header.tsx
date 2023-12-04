import styles from "@/styles/Header.module.css";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import AddPost from "./AddPost";

import { useAtom, atom } from "jotai";
import Link from "next/link";
import UserDetails from "./UserDetails";
import BasicTabs from "./BasicTabs";

export const inputAtom = atom("");

const Header = () => {
  const [inputValue, setInputValue] = useAtom(inputAtom);

  return (
    <>
      <Stack
        sx={{
          zIndex: "111111",
          position: "fixed",
          width: "100%",
          boxShadow: "1px 1px 10px 3px rgb(215, 214, 214)",
          height: "20vh",
          paddingInline: "1rem",
          backgroundColor: " rgb(247, 246, 246)",
        }}
      >
        <Box className={`${styles.navbar}`}>
          <div className={styles["header-logo-search"]}>
            <Link href="/">
              <Image
                src="/Unsplash_Logo.svg"
                height={100}
                width={70}
                alt="unsplash-logo"
              />
            </Link>
            <TextField
              type="text"
              placeholder="Search by name or tag"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                flexGrow: "1",
              }}
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <Stack direction="row" gap={3}>
            <AddPost />
            <UserDetails />
          </Stack>
        </Box>
        <Stack>
          <BasicTabs />
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
