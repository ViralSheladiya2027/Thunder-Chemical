// import { signInWithCredential } from 'firebase/auth';
// import React ,{useState} from 'react';
// import { Link } from "react-router-dom";
// import { useNavigate} from 'react-router-dom';
// // import {Redirect} from "react-router-dom";
// import { auth } from "../firebase"

// const Login = () => {

//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');

// const [errorMsg, setErrorMsg] = useState('');
// const [successMsg, setSuccessMsg] = useState('')

// const handleLogin = async(e)=>{
//     e.preventDefault();
// console.log(email,password)
//    signInWithCredential(auth, email, password)
//   .then(()=>{
//       setSuccessMsg("login success");
      
//       setEmail("");
//         setPassword("");
//         setErrorMsg("");
//         setTimeout(() => {
//           setSuccessMsg("");
//           navigate("/");
//           // <Redirect to={'/'}/>
//         }, 3000); 
//     })
//   .catch((error)=>{
//     setErrorMsg(error.msg)})
// }
//   return (
//     <div>
//          <div className="container my-3 ">
//     <h1>Login</h1>
//     <hr></hr>
// {successMsg&&<>
// <div className="success-msg">{successMsg}</div>
// </>}

// {errorMsg&&<>
// <div className="success-msg">{errorMsg}</div>
// </>}

// {/* <br></br> */}
//     <form className='form-group' onSubmit={handleLogin}  >
//     <div className="mb-3 my-2"/>
//   <div className="mb-3">
//     <label htmlFor="email" className="form-label">Email address</label>
//     <input type="email" className="form-control"placeholder='Enter your email' id="email" onChange={(e)=>setEmail(e.target.value)} value={email} aria-describedby="emailHelp"/>
//   </div>
//   <div className="mb-3">
//     <label htmlFor="password" className="form-label">Password</label>
//     <input type="password"className="form-control"placeholder='Enter your password' id="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
//     {/* <i className="fa-light fa-eye-slash"></i> */}
//   </div>
//   <div className="btn-box">
//     <span>Dont have an account to signup <Link to ="/signup" className='link'>Here</Link> </span>
//   </div>
//   <button type="submit" className="btn btn-success my-3" >LOGIN</button>
  
// </form>
// </div>
//     </div>
//   )
// }

// export default Login;

import { Box ,Typography,TextField,CircularProgress,Button} from '@mui/material'
import React, { useState }  from 'react'
import Container from '@mui/material/Container';
import logo from "../logo/logo.png";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from './Firebase';
import { Link, useNavigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { collection, addDoc } from "firebase/firestore";

const Login = () => {
  
const [showPassword, setShowPassword] = useState(false);
const handleClickShowPasswordOne = () => setShowPassword(!showPassword);
const handleMouseDownPassword = () => setShowPassword(!showPassword);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [errorMsg, setErrorMsg] = useState('');
const [successMsg, setSuccessMsg] = useState('')

const navigate = useNavigate();

  const handleLogin= async (e) =>{
    e.preventDefault();
    console.log(email,password);
    
      try {
        await createUserWithEmailAndPassword(auth , email, password);
      } 
      catch (err) {
        console.error(err);
        setErrorMsg(err.message)
       setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      }

      try {
        await signInWithEmailAndPassword(auth , email, password);
        setSuccessMsg("login success");
       setEmail("");
          setPassword("");
          setTimeout(() => {
            setSuccessMsg("");
            navigate("/");
          }, 3000); 
      } 
      catch (err) {
        // console.error(err);  
       setErrorMsg(err.message)
       setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      }

      try {
        await addDoc(collection(db ,"user"),{
email:email
        })
      } 
      catch (err) {
        setErrorMsg(err.message)
      }
  }
  
  return (
    <>
    {successMsg&&<>
      <Alert variant="filled" severity="success">
 {successMsg}
</Alert>
</>}

{errorMsg&&<>
  <Alert variant="filled" severity="error">
 {errorMsg}
</Alert>
</>}

     <Container maxWidth="xs">
     <Box sx={{ 
        borderRadius:"10px",
        backgroundColor: 'white',
        boxShadow:"2",
       textAlign:"center",mt:"70px",p:"24px",
     }} >
      <img src={logo } height= "50px"/>
      <br/>
      {/* <Typography color = "textSecondary" variant="h5">Admin</Typography> */}
      <TextField
          label="Email"
          id="outlined-size-small"
          size="small"
          fullWidth
          margin="normal"
          padding="normal"
        required
        value={email}
        onChange={event => setEmail(event.target.value)} 
        
        />
         <TextField
          label="Password"
          id="outlined-size-small"
          type={showPassword ? 'text' : 'password'}
        
          size="small"
          fullWidth
          margin="normal"
          padding="normal"
        required
        value={password}
        onChange={event => setPassword(event.target.value)} 
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
          )
        }}
        
        />
        <br></br>
        <Typography>Dont have an account to signup <Link to ="/signup" className='link'>Here</Link> </Typography>
        {/* <br></br> */}
         {/* <CircularProgress size={30} paddingtop="10px"/> */}
         {/* <br/> */}
         <br/>
         <Button variant="contained" fullWidth color="primary" onClick={handleLogin}  >
  login
</Button>
      </Box>
    </Container>
    </>
  )
}

export default Login;
