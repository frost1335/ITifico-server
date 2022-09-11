import React from "react";
import { Container, Tabs, Tab, Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import CreateArticle from "../CreateArticle/CreateArticle";
import ArticleList from "../ArticleList/ArticleList";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="articles__list">
      <Container>
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
            <ArticleList />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreateArticle />
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
};

export default Content;
