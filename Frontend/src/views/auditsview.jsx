import { useState } from "react";
import ListItem from "../components/listitem";

export default function AuditView(){
    let items = [
        {
            id: 1,
            header: 'Audit 1',
            subOne: 'subOne 1',
            subTwo: 'subTwo 2',
            subThree: 'subThree 3'
        },
        {
            id: 2,
            header: 'Audit 2',
            subOne: 'subOne 1',
            subTwo: 'subTwo 2',
            subThree: 'subThree 3'
        },
        {
            id: 3,
            header: 'Audit 3',
            subOne: 'subOne 1',
            subTwo: 'subTwo 2',
            subThree: 'subThree 3'
        }
    ]

    function editItem(id){
        console.log('edit',id)
    }

    function deleteItem(id){
        console.log('delete',id)
    }

    return (
        <>
        <ul>
            {items.length === 0 && "No data found!"}
            {items.map(item => {
                return <li key={item.id}>
                    <ListItem editThis={editItem} deleteThis={deleteItem} item={item} />
                    </li>
            })}
        </ul>
        </>
    )
}