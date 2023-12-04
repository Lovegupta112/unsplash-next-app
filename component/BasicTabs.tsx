import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { userEmailAtom } from "@/pages/posts/userPosts";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const setUserEmail = useSetAtom(userEmailAtom);
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/posts/userPosts") {
      setValue(1);
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
    if (newValue === 1) {
      setUserEmail(data?.user?.email!);
      router.push("/posts/userPosts");
    } else {
      router.push("/posts");
      setUserEmail("");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Posts" {...a11yProps(0)} />
        <Tab label="Your posts" {...a11yProps(1)} />
        {/* <Tab label="Your Favorites" {...a11yProps(2)} /> */}
      </Tabs>
    </Box>
  );
}
