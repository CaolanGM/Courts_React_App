import React, { useEffect, useState } from 'react';
import  './Browse.css'

export default function ViewListTypes({clicked, court, backClicked}) {


    // const [status, setStatus] = useState(caseVar.status)

    const listTypeClicked = (listType) => {
        clicked(listType)
    }


    return (
        <div className="viewListType">

            <button onClick={backClicked}>Back to Courts</button>

            <h2>{court}</h2>


            <div className="viewCourtsColumn">
                <button className="courtTile" onClick={()=>listTypeClicked("Morning List")}>Morning List</button>
                <button className="courtTile" onClick={()=>listTypeClicked("Afternoon List")}>Afternoon List</button>
                <button className="courtTile" onClick={()=>listTypeClicked("Evening List")}>Evening List</button>
            </div>
            
            
        </div>
    )
}
