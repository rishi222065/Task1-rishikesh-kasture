import React, { useState } from 'react'
import './CSS/Login.css'

const Login = () => {
  const [state, setState]=useState("Login");
  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandeler =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

const login =async ()=>{
  console.log("Login",formData)
  let responseData;
  await fetch('http://localhost:4000/login ',{
    method:'POST',
    headers:{
      Accept:"application/form-data",
      "Content-Type":"application/json",
    },
    body:JSON.stringify(formData)
  }).then((response)=>response.json())
  .then((data)=>responseData=data)
  if  (responseData.success) {
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }
  else {
    alert(responseData.errors)
  }
}

const Signup =async ()=>{
  console.log("Signup",formData)
  let responseData;
  await fetch('http://localhost:4000/signup',{
    method:'POST',
    headers:{
      Accept:"application/form-data",
      "Content-Type":"application/json",
    },
    body:JSON.stringify(formData)
  }).then((response)=>response.json())
  .then((data)=>responseData=data)
  if  (responseData.success) {
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }
  else {
    alert(responseData.errors)
  }
}


  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className="loginsignup-fields">
         {state==="Signup"?<input name='username' value={formData.username} onChange={changeHandeler} type="text" placeholder="Username"/>:<></>}
          <input type="email" name='email' value={formData.email} onChange={changeHandeler} placeholder="Email Adress" />
          <input type="password" name='password'value={formData.password} onChange={changeHandeler} placeholder="Password"/><br/>
        </div>
        <button onClick={()=>{state==="Login"?login():Signup()}}>Continue</button>
        {state === "Signup"
        ?
        <p className="loginsignup-login">Already have an account? <span onClick={()=>{setState('Login')}} >Login hear</span></p>
       : <p className="loginsignup-login">create an account  <span onClick={()=>{setState('Signup')}} >click here</span></p>
      }
        {/* <p className="loginsignup-login">Already have an account? <span>Login hear</span></p> */}
         <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>by continuing, i gree the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}
export default Login;