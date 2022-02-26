import React, { useEffect, useState } from 'react';
import axios from "axios";

import './ViewCases.css'
import { Oval } from  'react-loader-spinner'
import CaseTile from './ViewCaseTile';

function ViewCasesScreen({editMode}) {


    const [cases, setCases] = useState([])
    const [loading, setLoading] = useState(false)


    const baseURL = "http://localhost:1337/";


    const keyPressed = (event) => {

        console.log("Key Pressed", event.keyCode)

    }

    useEffect(async () => {

        var caseArr = []
        caseArr.push({id:1, name:"Melvin v Melvin", status:"Complete"})
        caseArr.push({id:2,name:"Melvin v Jackson", status:"Live"})
        caseArr.push({id:3,name:"Murphy v Melvin", status:"SecondCall"})

        setCases(caseArr)
        setLoading(false)


        window.addEventListener('keydown', keyPressed);

 
    }, []);

   

    return(
        <div className="container">

            <h3>Cases Screen</h3>
            
           
            {(!loading) && <div>


            <div className="casesHeaders">
                <div className="headerName">Name</div>
                {(!editMode) && <div className="headerStatus">Status</div>}
                {(editMode) && <div className="headerEdit">
                    <div>Live</div>
                    <div>Completed</div>
                    <div>Second Call</div>
                </div>}

            </div>
            
                

            {cases.map((caseVar) => (
            // <div onClick={() => eventTileClicked(eventIns)}>
            <CaseTile caseVar={caseVar} editMode={false} />
            // </div>
            ))}
            </div>}


        </div>
    )

}

export default ViewCasesScreen