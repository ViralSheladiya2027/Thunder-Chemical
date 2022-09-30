import { signInWithCredential } from 'firebase/auth';
import React ,{useState} from 'react';
import { Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import { auth } from "../firebase"

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [errorMsg, setErrorMsg] = useState('');
const [successMsg, setSuccessMsg] = useState('')

const handleLogin = async(e)=>{
    e.preventDefault();

   signInWithCredential(auth, email, password)
  .then(()=>{
      setSuccessMsg("login success");
      
      setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/");
        }, 3000); 
    })
  .catch((error)=>{
    setErrorMsg(error.msg)})
}
  return (
    <div>
         <div className="container my-3 ">
    <h1>Login</h1>
    <hr></hr>
{successMsg&&<>
<div className="success-msg">{successMsg}</div>
</>}

{errorMsg&&<>
<div className="success-msg">{errorMsg}</div>
</>}

{/* <br></br> */}
    <form className='form-group'onSubmit={handleLogin} >
    <div className="mb-3 my-2"/>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"placeholder='Enter your email' id="email" onChange={(e)=>setEmail(e.target.value)} value={email} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"className="form-control"placeholder='Enter your password' id="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
    {/* <i className="fa-light fa-eye-slash"></i> */}
  </div>
  <div className="btn-box">
    <span>Already have an account Login <Link to ="/" className='link'>Here</Link> </span>
  </div>
  <button type="submit" className="btn btn-success my-3">LOGIN</button>
  
</form>
</div>
    </div>
  )
}

export default Login;