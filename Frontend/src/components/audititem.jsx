export default function AuditItem(props){
    const itemDetails = props.item
    function editItem(id){
        props.editThis(id)
    }

    function deleteItem(id){
        props.deleteThis(id)
    }

    return (
        <>
        <p>Date: {props.audit.date}</p>
        {props.audit.patient_id && <p>Patient ID: {props.audit.patient_id.toString()}</p>}
        <p>User ID: {props.audit.user_id}</p>
        <p>Action Type: {props.audit.action_type}</p>
        </>
    )

}