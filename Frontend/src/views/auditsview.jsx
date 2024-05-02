import { useEffect } from "react";
import { useState } from "react";
import AuditItem from "../components/audititem";


export default function AuditView(){
    const [auditLogs,setAuditLogs] = useState([])
    const [message,setMessage] = useState("")
    const accessToken = 'Bearer '+localStorage.getItem('accessToken');

    function getAuditLogs(user_id){
        return fetch('http://localhost:4000/api/getAudit', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
          }
        })
          .then(data => data.json())
    }
    
    useEffect(() => {
        getAuditLogs().then(response => {

            if('success' in response){
                if(response['success']){
                    if('audit' in response){
                        setAuditLogs(response['audit'])
                    }
                }
            }else{
                console.log(response['error'])
                console.log(response['message'])
            }
            if('message' in response){
                console.log('Server says',response['message'])
                setMessage(response['message'])
            }
        })
    } ,[])


    return (
        <>
        <ul>
            {` ${auditLogs.length} Audits found!`}
            <p>{message}</p>
            {auditLogs.map(audit => {
                return <li key={audit._id}>
                <AuditItem audit={audit}/>
                </li>
            })}
        </ul>
        </>
    )
}