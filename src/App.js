
import React , { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NavBar from './components/NavBar';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from "./components/Firebase";
import { Box } from '@mui/material';


 const App = () => {

  function getCurrentUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const user = getCurrentUser();

  return (
    <>
  
      <Router>
        <NavBar  user={user}/>
        <Box height={50}/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
