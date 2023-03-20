
import React , { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NavBar from './components/NavBar';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./components/Firebase";
import { Box } from '@mui/material';
import { addDoc, collection, getDocs } from "firebase/firestore";

 const App = () => {

  function getCurrentUser() {
    const [user, setUser] = useState(null);

         const userCollectionRef = collection(db, "user");

  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
       
          // const getUsers = async () => {
          //   const data = await getDocs(userCollectionRef);
          //   setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          // };
            //  addDoc(collection(db, "user"), {
            //  userid:user.uid
              
            // });
         
          setUser(user)
          // console.log(user.uid)
          // getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = getCurrentUser();
console.log(user)
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
