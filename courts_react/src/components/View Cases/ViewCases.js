import React, { useEffect, useState } from 'react';
import axios from "axios";

import './ViewCases.css'
import { Oval } from  'react-loader-spinner'
import CaseTile from './ViewCaseTile';
import AdminToolbar from '../Admin/editCasesToolbar';
import { useNavigate } from "react-router-dom";

function ViewCasesScreen({editMode,court,listType,listName,backClicked,listID}) {


    const [cases, setCases] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [loading, setLoading] = useState(false)
    const [addingCase, setAddingCase] = useState(true)


    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";

    var caseArr = []
    var currentIndex  = 0
    const navigate = useNavigate();


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


    const loadCases = async() => {

        

        axios.get(baseURL+'getListByID',{
            
            params:{
                id: listID
            }

        
        }).then( (response) => {
        
            const data = response.data;
            
            data.cases.forEach(caseVar => {
                caseArr.push(caseVar)
            });

            console.log(data)

            setCases(caseArr)
            setLoading(false)
        });
    
        
    }

    const clicked = (button) => {
        console.log("BTN", button)

        if(button === "Home"){navigate("../", { replace: true });}
    }


    useEffect(async () => {


        window.addEventListener('keydown', keyPressed);

        setLoading(true)
        loadCases()
 
    }, []);

   

    return(
        <div className="container">

        <AdminToolbar buttonClicked={clicked}/>
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