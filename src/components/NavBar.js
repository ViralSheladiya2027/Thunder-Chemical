import React, {useState,useEffect} from "react";
import Container from "@mui/material/Container";
import {
  AppBar,
  Box,
  Badge,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu,
  IconButton,
  InputBase,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../logo/logo.png";
import { AccountCircle, Search } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "react-use-cart";
import { db , auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import { BiSearch } from 'react-icons/bi';




const NavBar = ({user}) => {
  
  const [anchorEl, setAnchorEl] = useState(null);


 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const logOutClick =()=>{
    auth.signOut();
    navigate("/signup");
  }
  const { isEmpty, totalItems } = useCart();

  return (
    <div>
      <Box sx={{ flexgrow: "1", height: "18px" }}>
        <AppBar position="fixed" style={{ background: "#263238" }}>
          <Toolbar>
            <Link className="nav-link" to="/">
              <img src={logo} height="40px" style={{ marginRight: "15px" }} />
             <Typography sx={{backgroud:"white"}}>{user}</Typography> 
            </Link>
            {/* <SearchIcon />
            <InputBase
              sx={{ color: "white" }}
              placeholder="Search..."
              aria-label="search "
            /> */}
    <div style ={{display:"flex",border:"none"}}>
      <div>
      <input type="text" placeholder="Search Thunder Chemical..." style={{width : "640px",height:"38px"}} />

      </div>
      <div>
      <BiSearch size="0.5rem" style={{background: "yellow",color:"black",height:"38px",width:"38px" }} />
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
              <AccountCircle  />
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
            {/* {!user && <> */}
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
             {/* </> } */}
             
             {/* {user &&  */}
              <MenuItem  onClick={logOutClick} primary="Logout">
                 Logout            
              </MenuItem>
             {/* }  */}
              
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
