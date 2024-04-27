export default function ListItem(props){
    const itemDetails = props.item
    function editItem(id){
        props.editThis(id)
    }

    function deleteItem(id){
        props.deleteThis(id)
    }

    return (
        <>
        <p>{itemDetails.header}</p>
        <p>{itemDetails.subOne}</p>
        <p>{itemDetails.subTwo}</p>
        <p>{itemDetails.subThree}</p>
        <button onClick={() => editItem(itemDetails.id)}>Edit</button>
        <button onClick={() => deleteItem(itemDetails.id)}>Delete</button>
        </>
    )
}