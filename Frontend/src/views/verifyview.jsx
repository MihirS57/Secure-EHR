import { useEffect } from "react";
import { useState } from "react";
import VerifyItem from "../components/verifyitem";

export default function VerifyView(){
    const [requests,setRequests] = useState([])
    const [message,setMessage] = useState("")
    const accessToken = 'Bearer '+localStorage.getItem('accessToken');

    function getVRequests() {
        console.log("API CALL")
        return fetch('http://localhost:4000/api/getVRequests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
          },
        })
          .then(data => data.json())
       }
    
    function verifyUser(user_id){
        return fetch('http://localhost:4000/api/verifyUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
          },
          body: JSON.stringify({user_id: user_id})
        })
          .then(data => data.json())
    }
    

    function approveUser(user_id,req_idx){
        console.log(user_id)
        verifyUser(user_id).then(response => {
            if('success' in response){
                if(response['success']){
                    if('message' in response){
                        console.log('Server says',response['message'])
                        requests.splice(req_idx, 1);
                        console.log(requests.length)
                    }
                }else{
                    if('message' in response){
                        console.log('Unsuccessful, message',response['message'])
                    }else if('error' in response){
                        console.log('Unsuccessful, error',response['error'])
                    }else{
                        console.log('Unsuccessful')
                    }
                }
            }
        })
    }

    useEffect(() => {
        let mounted = true;
        getVRequests().then(response => {
            
            // console.log('Response',response)
            
            if ('success' in response) {
                if(response['success']){
                    if('requests' in response){
                        console.log(response['requests'].length)
                        setRequests(response['requests'])
                    }
                }
            } else {
                if('error' in response){
                    console.log('Server says',response['error'])
                }else{
                    console.log('Some error occured')
                }
            }
            if('message' in response){
                console.log('Server says',response['message'])
                setMessage(response['message'])
            }
        }
        )
        return () => mounted = false;
      },[])


    return (
        <>
        <ul>
            {` ${requests.length} Requests found!`}
            <p>{message}</p>
            {requests.map((request,idx) => {
                return <li key={request._id}>
                    <VerifyItem request={request} verify={approveUser} index={idx} />
                    </li>
            })}
        </ul>
        </>
    )
}