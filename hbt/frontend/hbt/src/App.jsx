


import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Componnent/Login";
import Signup from "./Componnent/signup";
import Landing from "./Componnent/Landing"
  import './App.css';


const App = () => {
  // const [isLogin, setIsLogin] = useState(true);

  // return (
  //   <div>
  //     <button onClick={() => setIsLogin(true)}>Login</button>
  //     <button onClick={() => setIsLogin(false)}>Signup</button>
  //     {isLogin ? <Login /> : <Signup />}
  //   </div>
  // );



  return (
    <>
      <div>
        <Routes>
           <Route path ="/login" element={<Login/>}/>
           <Route path ="/signup" element={<Signup/>}/>
           <Route path ="/" element={<Landing/>}/>
       </Routes>
          
       
      </div>
     
    </>
  )
  
};

export default App;

