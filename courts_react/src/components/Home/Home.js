import React, { useEffect, useState } from 'react';

import './Home.css'

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


                <div className='homeText'>
                <p>Welcome to the Real-Time Legal Diary.</p>
                <p>This is a third-party initiative to display live updates in Court lists. Each list of cases is updated by participants in the Court to reflect the true status of each list.</p>

                {/* <p>For more information, <a href="https://www.surveymonkey.com/r/SKRG8DB" target="_blank">please contact us</a>.</p> */}
                <p>Alll list information is available at <a href="https://www.courts.ie/" target="_blank">courts.ie</a></p>
                </div>
                {showAddList && <div>
                
                <button className="courtTile addList" onClick={addList}>Add List</button>
                
                </div>}


                <ViewCourts clicked={courtClicked}/>
                
        
        
        </div>
    )
}
