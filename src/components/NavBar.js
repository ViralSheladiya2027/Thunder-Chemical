import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import logo from "../logo/logo.png";
import { auth } from "./Firebase";

const NavBar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState([]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const newProducts = products.filter((value) =>
      value.name.toLowerCase().includes(searchProduct.toLowerCase())
    );
    setProducts(newProducts);
  }, [searchProduct]);

  const logOutClick = () => {
    auth.signOut();
    navigate("/signup");
  };
  const { totalItems } = useCart();

  return (
    <div>
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
            <div
              // xs={10}
              // md={7}
              // lg={6}
              // xl={4}
              style={{
                display: "flex",
                flexgrow: "1",
                alignItems: "center",
                borderRadius: "none",
                // paddingLeft: "130px",
                // marginLeft:"5px"
                margin: "auto",
                padding: "auto",
                width: "100%",
              }}
            >
              <div>
                <input
                  type="text"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  placeholder="Search...."
                  style={{
                    // width: "640px",
                    width: "100%",
                    height: "38px",
                    paddingLeft: "15px",
                    border: "none",
                    outline: "none",
                  }}
                />
              </div>
              <div>
                <SearchIcon
                  size="small"
                  style={{
                    background: "#607d8b",
                    color: "black",
                    height: "40px",
                    width: "38px",
                  }}
                />
              </div>
            </div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{ marginLeft: "auto" }}
            >
              <AccountCircle />
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
                <>
                  <MenuItem onClick={handleClose}>
                    {" "}
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </MenuItem>
                </>
              )}

              {user && (
                <>
                  <MenuItem onClick={logOutClick} primary="Logout">
                    Logout
                  </MenuItem>
                </>
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
    </div>
  );
};

export default NavBar;
