import React from 'react'
import {AppBar, Box, Badge, Switch,FormControlLabel ,FormGroup ,MenuItem , Menu ,IconButton, InputBase, TextField, Toolbar} from "@mui/material"
import logo from "../logo/logo.png"
import {AccountCircle} from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from 'react-use-cart';


const NavBar = () => {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

     const {
    isEmpty,
    totalItems,
} = useCart ();

  return (
    <Box sx={{ display: 'flex' }}>
         <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
<AppBar position='fixed'style={{ background: '#263238' }}>
    <Toolbar>
        <img src={logo} height= "40px"style={{marginRight:"15px"}} />


<SearchIcon /> 
            <InputBase
        sx={{ color:'white' }}
        placeholder="Search..."
        aria-label='search ' 
      />

       
      
      <Box sx={{flexGrow: 1}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                
              >
                <AccountCircle/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}> <Link className="nav-link" to="/signup" >
       Sign Up
      </Link></MenuItem>
                <MenuItem onClick={handleClose}><Link className="nav-link" to="/login" >
       Login
      </Link></MenuItem>
              </Menu>
            </Box>

<Box>
   <Link className="nav-link"
                to="/cart"
              >
 <Badge badgeContent={totalItems} color="secondary">
 <ShoppingCartIcon  /> 
</Badge>
              </Link>
 
   
</Box>
            
    </Toolbar>
</AppBar>
        </Box>
  )
}

export default NavBar
