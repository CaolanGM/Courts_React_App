import React, { useEffect, useState } from 'react';
import  './Browse.css'

export default function ViewCourts({clicked}) {


    // const [status, setStatus] = useState(caseVar.status)

    const courtClicked = (court) => {

       clicked(court)
    }


    return (
        <div className="viewCourts">

            <div className="viewCourtsColumn">
                <button className="courtTile" onClick={()=>courtClicked("High Court")}>High Court</button>
                <button className="courtTile" onClick={()=>courtClicked("Supreme Court")}>Supreme Court</button>
                <button className="courtTile" onClick={()=>courtClicked("Criminal Court")}>Criminal Court</button>
            </div>
            
            <div className="viewCourtsColumn">
                <button className="courtTile" onClick={()=>courtClicked("Civil Court")}>Civil Court</button>
                <button className="courtTile" onClick={()=>courtClicked("Justice Court")}>Justice Court</button>
                <button className="courtTile" onClick={()=>courtClicked("Tennis Court")}>Tennis Court</button>
            </div>
        </div>
    )
}
