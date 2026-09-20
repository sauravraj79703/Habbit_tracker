import React, { useState } from 'react'
import './Login.css'
import { loginUser } from "./allApi";
import myimage from '../assets/hb2.jpg';
import {useNavigate} from 'react-router-dom';




const Login = () => {

const [form, setForm] = useState({email:"",password:""});
const[message, setMessage] = useState("");
const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form.email, form.password);

      // const token = res.data.token;
      // localStorage.setItem("token", token);    //store token for future
      setMessage("Login successful");
      navigate("/");
    } catch (err) {
      setMessage("Login failed");
    }
  };


  const handleclick = () =>{
    navigate('/signup')
  }

  
  return (
    <div>
      <div className="main-container">

        <div className="left-container">
           <h1>Welcome Back!</h1>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia, amet.</p>

            <form action="login-page" className="login-page"onSubmit={handleSubmit}>
              <input name="email" onChange={handleChange} placeholder='Email'/>
              <input  name = "password" type="password" onChange={handleChange} placeholder='password'/>
              {/* <label htmlFor="forgetpassword">forgetpassword?</label> */}
              <a href=""className='btn-signup' onClick={handleclick}>Signup</a>

              <button>Login</button>
               <p>{message}</p>
            </form>

        </div>

        <div className="right-container">
             
            <img src={myimage} alt=""  className='image-container'/>
             
        </div>

      </div>
    </div>
  );
};

export default Login