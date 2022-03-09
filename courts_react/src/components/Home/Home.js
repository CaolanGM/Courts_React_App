import React, { useEffect, useState } from 'react';



import { useNavigate } from "react-router-dom";
import ViewCourts from '../Browse/ViewCourts';


export default function HomeScreen() {

    const [showAddList,setShowAddList] = useState(localStorage.getItem("authID") !== null)
    const [court, setCourt] = useState("")
    
    const navigate = useNavigate();


    const courtClicked = (court) => {

        setCourt(court)
        navigate("../viewLists/"+court, { replace: true});
    }


    const addList = () => {
        navigate("../addList", { replace: true});

    }


    return (
        <div className='container'>
                
                {showAddList && <div>
                
                <button className="courtTile addList" onClick={addList}>Add List</button>
                
                </div>}


                <ViewCourts clicked={courtClicked}/>
                
        
        
        </div>
    )
}
