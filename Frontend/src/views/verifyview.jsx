import { useEffect } from "react";
import { useState } from "react";
import VerifyItem from "../components/verifyitem";

export default function VerifyView(){
    const [requests,setRequests] = useState([])
    const accessToken = 'Bearer '+localStorage.getItem('accessToken');

    function getVRequests() {
        console.log("API CALL")
        return fetch('http://localhost:4000/api/getVRequests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
          }
        })
          .then(data => data.json())
       }

    useEffect(() => {
        let mounted = true;
        getVRequests().then(response => {
            
            console.log('Response',response)
            if ('success' in response) {
                if(response['success']){
                    if('requests' in response){
                        console.log(response['requests'].length)
                        setRequests(response['requests'])
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
        )
        return () => mounted = false;
      },[])

    function verifyUser(id){
        
    }

    return (
        <>
        <ul>
            {requests.length === 0 && "No Requests found!"}
            {requests.map(request => {
                return <li key={request._id}>
                    <VerifyItem request={request} />
                    </li>
            })}
        </ul>
        </>
    )
}