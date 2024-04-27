import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom';


export default function Login(){
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const navigate = useNavigate();
    

    async function loginUser(credentials) {
        return fetch('http://localhost:4000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
       }

    async function handleLogin(e){
        console.log('Logging in')
        const response = await loginUser({
            name,
            email,
            password
          });
          if ('success' in response) {
            if(response['success']){
                if('token' in response){
                    localStorage.setItem('accessToken', response['token']);
                    navigate('/dashboard')
                }
            }
          } else {
            if('message' in response){
                console.log('Server says',response['message'])
            }else if('error' in response){
                console.log('Server says',response['error'])
            }else{
                console.log('Some error occured')
            }
            
          }


        
    }


    return (
        <>
            <>
            <label htmlFor="input_fullname">Full name</label>
            <input type="text" id="input_fullname" onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="input_email" >Email Address</label>
            <input type="text" id="input_email" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="input_password" >Password</label>
            <input type="password" id="input_password" onChange={(e) => setPassword(e.target.value)}/>
            <button id="submitForm" onClick={() => handleLogin()}>Submit</button>
            <Link to="/register">Sign Up</Link>
            </>
        </>
        
        
    )
}