export default function VerifyItem(props){

    return(
        <>
        <p>Name: {props.request.name}</p>
        <p>Email: {props.request.email}</p>
        <p>User Type: {props.request.user_type}</p>
        <button onClick={() => props.verify(props.request.user_id,props.index)}>Approve</button>
        </>
    )
}