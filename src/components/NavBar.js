// import { AccountCircle } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Avatar,
  // Autocomplete,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  // TextField,
  Toolbar
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import logo from "../logo/logo.png";
import { auth } from "./Firebase";

const NavBar = ({user,fullName}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const logOutClick = () => {
    auth.signOut();
    navigate("/signup");
  };
  const { totalItems } = useCart();

  return (
    <>
      <Box sx={{ flexgrow: "1", height: "18px" }}>
        <AppBar position="fixed" style={{ background: "#263238" }}>
          <Toolbar>
            <Link className="nav-link" to="/">
              <img
                src={logo}
                alt="logo"
                height="40px"
                style={{ marginRight: "15px" }}
              />
            </Link>
            {/* <div>{user.email}</div> */}
            {/* <span style={{bgcolor:"red"}}>{user.fullName}</span> */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ marginLeft: "auto",marginRight:"22px" }}
            >
              {/* <AccountCircle /> */}
              {/* <Avatar sx={{ bgcolor:"#795548" }}> {user.fullName.charAt(0)+" "}</Avatar> */}
              <Avatar  sx={{ bgcolor:"#795548" }}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {!user && (
                <MenuItem onClick={handleClose}>
                  {" "}
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </MenuItem>
              )}

              {!user && (
                <MenuItem onClick={handleClose}>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </MenuItem>
              )}

              {user && (

                <MenuItem onClick={logOutClick} primary="Logout">
                  Logout
                </MenuItem>
              )}
               

            </Menu>

            <Link className="nav-link" to="/cart">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
