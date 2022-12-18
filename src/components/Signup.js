import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import logo from "../logo/logo.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./Firebase";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPasswordOne = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg("signup success");
      setEmail("");
      setFullName("");
      setPassword("");
      setAddress("");
      setMobileNumber("");
      setAddress("");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/login");
      }, 3000);
    } catch (err) {
      // console.error(err);
      setErrorMsg(err.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }

    try {
      await addDoc(collection(db, "user"), {
        email: email,
        address: address,
        fullname: fullName,
        mobilenumber: mobileNumber,
      });
    } catch (err) {
      setErrorMsg(err.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  return (
    <>
      {successMsg && (
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
      )}

      <Container maxWidth="xs">
        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "white",
            boxShadow: "2",
            textAlign: "center",
            mt: "70px",
            p: "24px",
          }}
        >
          <img src={logo} height="50px" />
          <br />
          {/* <Typography color = "textSecondary" variant="h5">Admin</Typography> */}
          <TextField
            label="Full Name"
            id="outlined-size-small"
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
            id="outlined-size-small"
            size="small"
            fullWidth
            margin="normal"
            padding="normal"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            //  style={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            type="number"
            label="Mobile Number"
            id="outlined-size-small"
            size="small"
            fullWidth
            margin="normal"
            padding="normal"
            required
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.target.value)}
          />
          <TextField
            label="Password"
            id="outlined-size-small"
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
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Address"
            id="outlined-size-small"
            size="small"
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
            <Link to="/login" className="link">
              Here
            </Link>{" "}
          </Typography>
          {/* <br></br> */}
          {/* <CircularProgress size={30} paddingtop="10px"/> */}
          {/* <br/> */}
          <br />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleSignup}
          >
            sign up
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
