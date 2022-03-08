import React, { useEffect, useState } from 'react';
import  './viewLists.css'

export default function ListRow({listVar,onClick}) {

    
    const [emptyRow, setEmptyRow] = useState(listVar.id === "Empty")  

    
    const rowClick = (e) => {

        onClick(listVar.index)
    }
    

    return (
        
        <tr className={`${listVar.index%2==0?'evenRow':'oddRow'}`} onClick={rowClick}>
            <td>{listVar.date}</td>
            <td>{listVar.listType}</td>
            <td>{listVar.subtitle}</td>
            <td>{listVar.uploaded}</td>

        </tr>
    )
}
