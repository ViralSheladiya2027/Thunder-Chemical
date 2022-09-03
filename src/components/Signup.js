import { createUserWithEmailAndPassword } from 'firebase/auth';
import React ,{useState} from 'react';
import { Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import { auth ,db} from "../firebase"

const Signup = () => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const [errorMsg, setErrorMsg] = useState('');
const [successMsg, setSuccessMsg] = useState('')

const handleSignup = async(e)=>{
    e.preventDefault();

  createUserWithEmailAndPassword (auth, email, password)
  .then(()=>{
      setSuccessMsg("login success");
      setFullName("")
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
    <h1>Signup</h1>
    <hr></hr>
{successMsg&&<>
<div className="success-msg">{successMsg}</div>
</>}

{errorMsg&&<>
<div className="success-msg">{errorMsg}</div>
</>}

{/* <br></br> */}
    <form className='form-group' >
    <div className="mb-3 my-2"/>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Full Name</label>
    <input type="name" className="form-control"placeholder='Enter your name' id="name" onChange={(e)=>setFullName(e.target.value)} value={fullName} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"placeholder='Enter your email' id="email" onChange={(e)=>setEmail(e.target.value)} value={email} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"className="form-control"placeholder='Enter your password' id="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
   
  </div>
  <div className="btn-box">
    <span>Already have an account Login <Link to ="/login" className='link'>Here</Link> </span>
  </div>
  <button type="submit"onClick={handleSignup} className="btn btn-success my-3">SIGN UP</button>
  
</form>
</div>
    </div>
  )
}

export default Signup;