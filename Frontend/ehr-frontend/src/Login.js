import React,{useState} from 'react'
function LoginUser(){
  
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  
    function login(){
      console.log(email,password)
    }
  
    return (
      
    )
  }
  export default LoginUser;