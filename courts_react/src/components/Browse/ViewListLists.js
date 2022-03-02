import React, { useEffect, useState } from 'react';
import  './Browse.css'

export default function ViewListLists({clicked, listType, backClicked}) {


    // const [status, setStatus] = useState(caseVar.status)

    const listListClicked = (listName) => {
        clicked(listName)
    }


    return (
        <div className="viewListList">

            <button onClick={backClicked}>Back to List Types</button>

            <h2>{listType}</h2>


            <div className="viewCourtsColumn">
                <button className="courtTile" onClick={()=>listListClicked("01/03/2020")}>01/03/2020</button>
                <button className="courtTile" onClick={()=>listListClicked("04/03/2020")}>04/03/2020</button>
                <button className="courtTile" onClick={()=>listListClicked("07/03/2020")}>07/03/2020</button>
            </div>
            
            
        </div>
    )
}
