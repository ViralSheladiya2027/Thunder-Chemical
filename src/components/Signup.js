import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, TextField, Typography } from "@mui/material";
// import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection,setDoc ,doc} from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo/logo.png";
import { auth, db } from "./Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPasswordOne = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(email, password, fullName, address, mobileNumber);

    const currentDate = new Date();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // setSuccessMsg("signup success");
      toast.success("Signup succesfully!", {
        position: "top-center",
        theme: "colored",
      });
      setEmail("");
      setFullName("");
      setPassword("");
      setAddress("");
      setMobileNumber("");
      setAddress("");
      // setTimeout(() => {
        // setSuccessMsg("");
        navigate("/login");
      // }, 3000);
    } catch (err) {
// if(`err.message === 'Firebase: Error(auth/invalid-email).'`){
//   toast.error("Please fill all required fields", {
//     position: "top-center",
//     theme: "colored",
//   });
// }
// if(`err.message==='Firebase: Error(auth/email-already-in-use).'`){
//   toast.error("User already exists", {
//     position: "top-center",
//     theme: "colored",
//   });
// }


      // console.error(err);
      // setErrorMsg(err.message);
      toast.error(err.message, {
        position: "top-center",
        theme: "colored",
      });
      // setTimeout(() => {
      //   setErrorMsg("");
      // }, 3000);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userCollectionRef = collection(db, "user");
      const userDocRef = doc(userCollectionRef, user.uid);

      return setDoc(userDocRef, {
          email: email,
          address: address,
          fullname: fullName,
          mobilenumber: mobileNumber,
          userid: user.uid,
          date:currentDate,
        });
        // setUser(user);
      } else {
        setUser(null);
      }
    });

    return user;
  };

  return (
    <>
      {/* {successMsg && (
        <>
          <Alert variant="filled" severity="success">
            {successMsg}
          </Alert>
        </>
      )}

      {errorMsg && (
        <>
          <Alert variant="filled" severity="error">
            {errorMsg}
          </Alert>
        </>
      )} */}

      <Container maxWidth="xs">
        <Box
          component="form"
          autoComplete="off"
          sx={{
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "2",
            textAlign: "center",
            mt: "70px",
            p: "24px",
          }}
        >
          <img src={logo} height="50px" alt="logo" />
          <Typography align="left" variant="h5">
            Sign Up
          </Typography>
          <TextField
            label="Full Name"
            size="small"
            fullWidth
            margin="normal"
            padding="normal"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
          <TextField
            label="Email"
            size="small"
            fullWidth
            margin="normal"
            padding="normal"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            inputProps={{
              inputMode: "numeric",
              pattern: "[1-9]{1}[0-9]{9}",
              maxLength: 10,
            }}
            // eslint-disable-next-line
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            label="Mobile Number"
            size="small"
            fullWidth
            margin="normal"
            padding="normal"
            required
            value={mobileNumber}
            onChange={(event) => {
              setMobileNumber(event.target.value);
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            size="small"
            fullWidth
            margin="normal"
            padding="normal"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordOne}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Address"
            size="small"
            multiline
            fullWidth
            margin="normal"
            padding="normal"
            required
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />

          <br></br>
          <Typography>
            Already have an account Login{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              className="link"
            >
              Here
            </Link>
          </Typography>
          <br />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSignup}
            style={{ background: "#263238" }}
          >
            sign up
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
