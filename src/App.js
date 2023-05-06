import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/Firebase";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [email, setEmail] = useState("");

  function getCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setEmail(user.email);
          console.log("mail::" + email);
        } else {
          setUser(null);
          setEmail("");
        }
      });
    }, []);
    return user;
  }
  const user = getCurrentUser();
  console.log("mail2::" + email);

  return (
    <>
      <Router>
        <NavBar user={user} email={email} />
        <Box height={50} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart user={user} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
