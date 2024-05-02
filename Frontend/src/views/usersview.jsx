import { useState, useEffect } from "react";
import PatientItem from "../components/patientitem";
export default function UsersView() {
    const [patientUsers,setPatientUsers] = useState([])
    const [message,setMessage] = useState("")
    const accessToken = 'Bearer '+localStorage.getItem('accessToken');

    function getPatients(){
        return fetch('http://localhost:4000/api/getPatientUsers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
          },
        })
          .then(data => data.json())
    }

    useEffect(() => {
        getPatients().then(response => {
            if('success' in response){
                if('patient_users' in response){
                    setPatientUsers(response['patient_users'])
                }
                if('message' in response){
                    setMessage(response['message'])
                }
            }
        })
    },[])


    function editItem(id){
        console.log('edit',id)
    }

    function deleteItem(id){
        console.log('delete',id)
    }

    return (
        <>
        <ul>
            {` ${patientUsers.length} patient users found!`}
            <p>{message}</p>
            {patientUsers.map((patientUser,idx) => {
                return <li key={patientUser.id}>
                    <PatientItem index={idx} patient={patientUser} verified={false} />
                    </li>
            })}
            
        </ul>
        </>
    )
}