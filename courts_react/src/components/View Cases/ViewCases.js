import React, { useEffect, useState } from 'react';
import axios from "axios";

import './ViewCases.css'
import { Oval } from  'react-loader-spinner'
import CaseTile from './ViewCaseTile';

function ViewCasesScreen({editMode,court,listType,listName,backClicked}) {


    const [cases, setCases] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [loading, setLoading] = useState(false)


    const baseURL = "http://localhost:1337/";

    var caseArr = []
    var currentIndex  = 0


    const findNextIndex = () =>
    {
        var foundNext = false
        var index  =  0

        caseArr[currentIndex].selected = false
        caseArr.forEach(caseVar => {
            if(index>currentIndex)
            {
                if(caseVar.status === "None" && !foundNext){
                    caseVar.selected = true
                    foundNext = true
                    console.log("Found")
                    setSelectedIndex(index)
                    currentIndex = index
                }
            }
            index++
        });

        setCases(caseArr)
    }

    const getStatusFromKeyCode  = (keyCode) => {

        switch(keyCode)
        {
            case 49: return "Live"
            case 50: return "Complete"
            case 51: return "SecondCall"
        }

    }

    const keyPressed = (event) => {

        console.log("Key Pressed", event.keyCode)

        if(event.keyCode ===  49 || event.keyCode ===  50 ||  event.keyCode ===  51)
        {
            let status  = getStatusFromKeyCode(event.keyCode)

            console.log("Case",currentIndex, caseArr[currentIndex] )
            caseArr[currentIndex].status = status
            setCases(caseArr)
            
            findNextIndex()
        }

        

    }

    useEffect(async () => {

        caseArr.push({id:1, name:"Melvin v Melvin", status:"None", selected:true})
        caseArr.push({id:2,name:"Melvin v Jackson", status:"None", selected:false})
        caseArr.push({id:3,name:"Murphy v Melvin", status:"None", selected:false})
        caseArr.push({id:4,name:"Murphy v Murphy", status:"None", selected:false})

        caseArr.push({name: "Filler Text"})
        caseArr.push({id:5,name:"Murphy v Murphy", status:"None", selected:false})
        caseArr.push({id:6,name:"Murphy v Murphy", status:"None", selected:false})

        setCases(caseArr)
        setLoading(false)


        window.addEventListener('keydown', keyPressed);

 
    }, []);

   

    return(
        <div className="container">

        <button onClick={backClicked}>Back to Lists</button>



            <h2>{court} - {listType}: {listName}</h2>
            
           
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
            <CaseTile caseVar={caseVar} editMode={editMode} />
            // </div>
            ))}


            </div>}


        </div>
    )

}

export default ViewCasesScreen