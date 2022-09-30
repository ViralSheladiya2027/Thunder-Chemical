
import React from 'react';
import { Link } from "react-router-dom";
import {auth } from '../firebase';
import { useNavigate} from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { BsCart2} from 'react-icons/bs';
import { useCart } from 'react-use-cart';


const NavBar= ({user}) =>{
  const navigate = useNavigate();

  const handleLogOut=()=>{
auth.signOut().then(()=>{
navigate.push("./login");
})
  }

  const {
    isEmpty,
    totalItems,
} = useCart ();

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
        <ShoppingCartOutlinedIcon style={{color:'white'}}/>
       </Link>
        </div> 
          <button type="button" className="btn btn-outline-danger mx-1" onClick={handleLogOut}>
          LOGOUT
          </button>
        </>}

        <Link
                to="/cart"
              >
        <BsCart2 style={{color:'white'}} size='2rem'/>
        
        {!isEmpty && <span style={{ position: 'relative', left: '-21px', top: '-18px',color:'white'}}>{totalItems}</span>}
        <span style={{ marginLeft: !isEmpty ? '-13px': 0,color:'white'}}> {""}Cart</span>
        </Link>
  </div>
</nav>

</>
  );
}



export default NavBar; 

