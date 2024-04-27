import { useState } from "react"

export default function PatientItem(props){
    const [age,setAge] = useState(props.patient.age)
    const [blood_group, setBG] = useState(props.patient.blood_group)
    const [disease,setDisease] = useState(props.patient.disease)
    const [medication,setMedication] = useState(props.patient.medication)
    const [ec_name,setECName] = useState(props.patient.emergency_contact ? props.patient.emergency_contact.name : '')
    const [ec_contact,setECPhone] = useState(props.patient.emergency_contact ? props.patient.emergency_contact.contact_details : '')
    const accessToken = 'Bearer '+localStorage.getItem('accessToken');

    function apiSavePatient(patient_user_id){
        return fetch('http://localhost:4000/api/addPatient', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
          },
          body: JSON.stringify({patient_user_id,age,blood_group,disease,medication,ec_name,ec_contact})
        })
          .then(data => data.json())
    }

    function saveAsPatient(patient_user_id){
        apiSavePatient(patient_user_id).then(response => {
            if('success' in response){
                if(response['success']){
                    console.log('Success')
                }else{
                    console.log('error',response['error'])
                    console.log('message',response['message'])
                }
            }
        })
    }

    function apiUpdatePatient(patient_id,patient_user_id){
        return fetch('http://localhost:4000/api/updatePatient', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
          },
          body: JSON.stringify({patient_id,patient_user_id,age,blood_group,disease,medication,ec_name,ec_contact})
        })
          .then(data => data.json())
    }

    function updatePatient(patient_id,patient_user_id){
        console.log(patient_id,patient_user_id)
        apiUpdatePatient(patient_id,patient_user_id).then(response => {
            if('success' in response){
                if(response['success']){
                    console.log('Success')
                }else{
                    console.log('error',response['error'])
                    console.log('message',response['message'])
                }
            }
        })
    }

    return (
        <>
        <p>{props.patient.name}</p>
        <p>{props.patient.email}</p>
        <label htmlFor="input_age">Age</label>
        <input type="text" id="input_age" value={age} onChange={(e) => setAge(e.target.value)}/>
        <br></br>
        <label htmlFor="input_bg" >Blood Group</label>
        <input type="text" id="input_bg" value={blood_group} onChange={(e) => setBG(e.target.value)}/>
        <br></br>
        <label htmlFor="input_disease">Disease</label>
        <input type="text" id="input_disease" value={disease} onChange={(e) => setDisease(e.target.value)}/>
        <br></br>
        <label htmlFor="input_medication" >Medication</label>
        <input type="text" id="input_medication" value={medication} onChange={(e) => setMedication(e.target.value)}/>
        <br></br>
        <label htmlFor="input_ecn">Emergency Contact Name</label>
        <input type="text" id="input_ecn" 
        value={ec_name} onChange={(e) => setECName(e.target.value)}/>
        <br></br>
        <label htmlFor="input_ecp" >Emergency Contact Phone</label>
        <input type="text" id="input_ecp" 
        value={ec_contact} onChange={(e) => setECPhone(e.target.value)}/>
        <br></br>
        <button 
        onClick={() => !props.verified ? saveAsPatient(props.patient.id) : updatePatient(props.patient.patient_id,props.patient.user_id)}
        >Verify or Save Patient</button>
        </>
    )
}