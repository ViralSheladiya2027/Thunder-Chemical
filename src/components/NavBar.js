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
} from "@mui/material";
import logo from "../logo/logo.png";
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "react-use-cart";
import { db , auth } from "./Firebase";


const NavBar = () => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // getting currentuser

  // function getCurrentUser(){
  //   const [user, setUser] = useState(null);
    
  //   useEffect(() => {
  //     auth.onAuthStateChanged(user=>{
  //       if(user){
  //        db .collection("user").doc(user.uId).get().then(snapshot=>{
  //         setUser(snapshot.data().fullname);
  //        })
  //       }
  //       else{
  //         setUser(null);
  //       }
  //     })
    
  //     return user;
  //   }, [])
    
  //   }
  
  //   const user=getCurrentUser();


  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutClick =()=>{
    auth.signOut();
  }
  const { isEmpty, totalItems } = useCart();

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              // onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <Box sx={{ flexgrow: "1", height: "18px" }}>
        <AppBar position="fixed" style={{ background: "#263238" }}>
          <Toolbar>
            <Link className="nav-link" to="/">
              <img src={logo} height="40px" style={{ marginRight: "15px" }} />
              {/* {user} */}
            </Link>
            {/* <SearchIcon />
            <InputBase
              sx={{ color: "white" }}
              placeholder="Search..."
              aria-label="search "
            /> */}

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
            {/* </>} */}
             
             {/* {user&&<> */}
              <MenuItem  onClick={logOutClick} primary="Logout">
                 Logout            
              </MenuItem>
             {/* </>} */}
              
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
