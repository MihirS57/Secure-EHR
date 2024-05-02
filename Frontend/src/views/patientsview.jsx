import { useEffect } from "react";
import { useState } from "react";
import PatientItem from "../components/patientitem";

export default function PatientsView(){
    const [patients,setPatients] = useState([])
    const accessToken = 'Bearer '+localStorage.getItem('accessToken');

    function getPatients(){
        return fetch('http://localhost:4000/api/getPatient', {
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
                if('patients' in response){
                    setPatients(response['patients'])
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
            {` ${patients.length} patients found!`}
            {patients.map((patient,idx) => {
                return <li key={patient._id}>
                    <PatientItem index={idx} patient={patient} verified={true}/>
                    </li>
            })}
            
        </ul>
        </>
    )
}