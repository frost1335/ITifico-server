import React, { useState } from "react";
import { Container, Tabs, Tab, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import CreateArticle from "../CreateArticle/CreateArticle";
import ArticleList from "../ArticleList/ArticleList";
import TagControl from "../../../../components/TagControl/TagControl";
import { useEffect } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Content = () => {
  const [value, setValue] = React.useState(0);
  const [currentId, setCurrentId] = useState("");

  const handleChange = (event, newValue) => {
    if (currentId) setValue(1);
    setValue(newValue);
    if (newValue === 0) setCurrentId("");
  };

  useEffect(() => {
    if (currentId) setValue(1);
  }, [currentId]);

  return (
    <div className="articles__list">
      <Container maxWidth={'xl'}>
        <Box sx={{ width: "100%" }} paddingTop={4}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Articles List" {...a11yProps(0)} />
              <Tab label="Create Article" {...a11yProps(1)} />
              <Tab label="Tag control" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ArticleList setCurrentId={setCurrentId} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreateArticle currentId={currentId} setCurrentId={setCurrentId} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TagControl />
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
};

export default Content;
