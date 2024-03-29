import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, TextField, Typography } from "@mui/material";
// import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo/logo.png";
import { auth } from "./Firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPasswordOne = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  // const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // setSuccessMsg("login success");
      toast.success("Login succesfully!", {
        position: "top-center",
        theme: "colored",
      });
      setEmail("");
      setPassword("");
      // setTimeout(() => {
      //   setSuccessMsg("");
      navigate("/");
      // }, 3000);
    } catch (err) {
      // if (err.message === `'Firebase: Error(auth/invalid-email).'`) {
      //   toast.error("Please fill all required fields", {
      //     position: "top-center",
      //     theme: "colored",
      //   });
      // }
      // if (err.message === `'Firebase: Error(auth/user-not-found).'`) {
      //   toast.error("Email not found", {
      //     position: "top-center",
      //     theme: "colored",
      //   });
      // }
      // if (err.message === "Firebase: Error(auth/wrong-password).") {
      //   toast.error("Wrong Password", {
      //     position: "top-center",
      //     theme: "colored",
      //   });
      // }
      // console.error(err);
      // setErrorMsg(err.message);
      // setTimeout(() => {
      //   setErrorMsg("");
      // }, 3000);
      toast.error(err.message, {
        position: "top-center",
        theme: "colored",
      });
    }
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
            Login
          </Typography>
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
          <br />
          <Typography>
            Dont have an account to signup{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none" }}
              className="link"
            >
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
            onClick={handleLogin}
            style={{ background: "#263238" }}
          >
            login
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Login;
