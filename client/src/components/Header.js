import React, { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import axios from "axios";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();

  function handleLogout() {
    axios.get('http://localhost:5000/logout')
      .then(() => {
        // clear any user data or authentication tokens from local storage or state
        // navigate the user to the login screen or a public page
        window.location.href = '/'; // replace with your desired page URL
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(110deg, rgb(206, 203, 114) 60%, #d0c989 60%)",
      }}
    >
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          style={{ textDecoration: "none" }}
        >
          My Blog
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(event, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " />
              <Tab LinkComponent={Link} to="/blogs/add" label="Create Blogs " />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <div>
              <Button
                onClick={handleLogout}
                LinkComponent={Link}
               
                variant="contained"
                sx={{
                  margin: 1,
                  borderRadius: 10,
                  background: "rgb(206, 213, 104)",
                }}
              >
                Log Out
              </Button>
            </div>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{
                margin: 1,
                borderRadius: 10,
                background: "rgb(206, 213, 104)",
              }}
            >
              Log Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
