import styles from "@/styles/Header.module.css";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";
import AddPost from "./AddPost";
import { inputAtom } from "@/pages/posts";
import { useAtom } from "jotai";
import Link from "next/link";

const Header = () => {
  const [inputValue, setInputValue] = useAtom(inputAtom);

  return (
    <>
      <header className={`${styles.header} `}>
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
        <AddPost />
      </header>
    </>
  );
};

export default Header;
