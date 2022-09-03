
import React from 'react';
import { Link } from "react-router-dom";
import {auth } from '../firebase';
import { useNavigate} from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const NavBar= ({user}) =>{
  const navigate = useNavigate();

  const handleLogOut=()=>{
auth.signOut().then(()=>{
navigate.push("./login");
})
  }
  return (
    <>
   
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
     <div className="leftside">
  <div className="container-fluid"/>
    <Link className="navbar-brand" to="/">Thunder Chemical</Link>
    </div>

        <div className="rightside ">
          {!user&&<>
            <button type="button" className="btn btn-outline-light mx-1">
          <Link className="nav-link" to="/signup">SIGN UP</Link>
          </button>
        <button type="button" className="btn btn-outline-light mx-1">
          <Link className="nav-link" to="/login">LOGIN</Link>
          </button>
         
          </>}
        {user&&<>
        <div>  <Link className="nav-link" to="/">{user}</Link> </div>
       <div>
       <Link className="nav-link" to="/cart">
        <ShoppingCartOutlinedIcon/>
       </Link>
        </div> 
          <button type="button" className="btn btn-outline-danger mx-1" onClick={handleLogOut}>
          LOGOUT
          </button>
        </>}
         
  </div>
</nav>

</>
  );
}



export default NavBar; 

