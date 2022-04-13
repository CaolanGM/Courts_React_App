import React, { useEffect, useState } from 'react';
import  './Browse.css'
import { useNavigate } from "react-router-dom";


export default function ViewCourts({clicked}) {

    const navigate = useNavigate();
    // const [status, setStatus] = useState(caseVar.status)

    const courtClicked = (court) => {

        if(court === "High Court" || court === "Supreme Court")
        {
            clicked(court)
        }
        else{
            navigate("../comingSoon", { replace: true });
        }
       
    }

    
    const liveClicked = () => {

        navigate("../comingSoon", { replace: true });
        
     }
 

    return (
        <div className="viewCourts">

            <div className="viewCourtsColumn">
                
                <button className="courtTile" onClick={()=>courtClicked("Supreme Court")}>Supreme Court</button>
                <button className="courtTile" onClick={()=>courtClicked("High Court")}>High Court</button>
                <button className="courtTile" onClick={()=>courtClicked("District Court")}>District Court</button>
            </div>
            
            <div className="viewCourtsColumn">
                <button className="courtTile" onClick={()=>courtClicked("Court of Appeal")}>Court of Appeal</button>
                <button className="courtTile" onClick={()=>courtClicked("Circuit Court")}>Circuit Court</button>
                <button className="courtTile activeLists" onClick={()=>liveClicked()}>Currently Active Lists</button>
            </div>
        </div>
    )
}
