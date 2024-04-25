import React,{useState} from 'react'
function RegisterUser() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  
    function registerMe(){
      console.log(name,email,password,", registering...")
    }
  
    function validateForm(){
      console.log(name,email,password,", validating...")
      registerMe()
    }
  
    return (
      <div>
        <label>Name</label>
        <input type="text" placeholder="Enter a name here..." onChange={(e) => setName(e.target.value)}></input>
        <br></br>
        <label>Email</label>
        <input type="text" placeholder="Enter an email here..." onChange={(e) => setEmail(e.target.value)}></input>
       <br></br>
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>
        <button onClick={validateForm}>Submit</button>
      </div>
      
      
    )
  }
  export default RegisterUser;