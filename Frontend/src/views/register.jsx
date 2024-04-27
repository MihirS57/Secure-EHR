import { useState } from "react"
import {useNavigate} from 'react-router-dom';

export default function Register() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [cpass,setCPass] = useState("")
    const [user_type,setUserType] = useState("patient")
    const navigate = useNavigate();

    function handleRadioChange(value){
        setUserType(value)
    }

    async function registerUser(credentials) {
        return fetch('http://localhost:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
       }

    async function handleRegister(e){
        console.log('Registering')
        const response = await registerUser({
            name,
            email,
            password,
            user_type
          });
          if ('success' in response) {
            if(response['success']){
                navigate('/login')
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
            <label htmlFor="input_cpass" >Confirm Password</label>
            <input type="password" id="input_cpass" onChange={(e) => setCPass(e.target.value)}/>
            <div>
                <input type="radio" id="patient" value="patient"
                    checked={user_type === "patient"} 
                    onChange={() =>  handleRadioChange("patient")}></input>
                <label>Patient</label>

                <input type="radio" id="audit-1" value="audit-1"
                    checked={user_type === "audit-1"} 
                    onChange={() =>  handleRadioChange("audit-1")}></input>
                <label>Audit 1</label>

                <input type="radio" id="audit-2" value="audit-2"
                    checked={user_type === "audit-2"} 
                    onChange={() =>  handleRadioChange("audit-2")}></input>
                <label>Audit 2</label>

                <input type="radio" id="audit-3" value="audit-3"
                    checked={user_type === "audit-3"} 
                    onChange={() =>  handleRadioChange("audit-3")}></input>
                <label>Audit 3</label>

                <input type="radio" id="admin" value="admin"
                    checked={user_type === "admin"} 
                    onChange={() =>  handleRadioChange("admin")}></input>
                <label>Admin</label>

            </div>
            <button id="submitForm" onClick={() => handleRegister()}>Submit</button>
            </>
        </>
    )
}