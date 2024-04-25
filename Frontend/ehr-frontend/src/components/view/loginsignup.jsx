import React from "react";
import './loginsignup.css'
const loginsignup = () => {
    return(
        <div>
        <label>Name</label>
        <input type="text" placeholder="Enter your full name" onChange={(e) => setEmail(e.target.value)}></input>
        <br></br>
        <label>Email</label>
        <input type="text" placeholder="Enter your registered email" onChange={(e) => setEmail(e.target.value)}></input>
        <br></br>
        <label>Password</label>
        <input type="password" placeholder="" onChange={(e) => setPassword(e.target.value)}></input>
        <br></br>
        <button onClick={login}>Submit</button>
      </div>
    )
}