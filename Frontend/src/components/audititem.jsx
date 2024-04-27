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
        <p>{props.audit.data}</p>
        <p>{props.audit.patient_id}</p>
        <p>{props.audit.user_id}</p>
        <p>{props.audit.action_type}</p>
        </>
    )

}