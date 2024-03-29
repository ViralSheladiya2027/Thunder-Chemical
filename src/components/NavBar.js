import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import logo from "../logo/logo.png";
import { auth } from "./Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const NavBar = ({ user, email }) => {
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
    toast.success("Your account has been logout", {
      position: "top-center",
      theme: "colored",
    });
    navigate("/signup");
  };
  const { totalItems } = useCart();

  return (
    <>
      {/* {!user && (
       toast("Login to your account", {
        position: "bottom-center",
        theme: "colored",
        autoClose: false,
        theme: "dark",
        progress: undefined,
      })
    )} */}
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
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ marginLeft: "auto", marginRight: "22px" }}
            >
              <Avatar sx={{ bgcolor: "#795548" }}>
                {" "}
                {email ? (
                  email.charAt(0).toUpperCase() + " "
                ) : (
                  <Avatar sx={{ bgcolor: "#795548" }} />
                )}
              </Avatar>
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

      {/* <div style={{position:"relative" }}>
        <img src ={background} alt =""/>
      </div> */}
    </>
  );
};

export default NavBar;
