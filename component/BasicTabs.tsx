import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
    if (newValue === 1) {
      // setInput('nature');
    } else if (newValue === 2) {
      // setInput('sea');
    } else {
      // setInput('');
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
        <Tab label="Your Favorites" {...a11yProps(2)} />
      </Tabs>
    </Box>
  );
}
