import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();

    const post = async()=>{
        
        try{
            const logindata = {
                email:Email,
                password:Password
            }

            const {data} =await axios.post("/api/v1/login", logindata)
            if(data.token){
                navigate("/admin");
    
            }

        
        }
        catch(error){
            alert("Email or Password is wrong!!! Try Again.");

        }

    }

    async function submitHandler(event){
        event.preventDefault();
        post()
        
        
    }

  return <div className='login-name'>
      
            <input className='login-input' placeholder='username' onChange={(event)=>{setEmail(event.target.value)}} name='email'></input>
            <input className='login-input' placeholder='password' onChange={(event)=>{setPassword(event.target.value)}} name='password'></input>
           
            <button onClick={submitHandler}>submit</button>

   
  </div>;
};

export default Login;
