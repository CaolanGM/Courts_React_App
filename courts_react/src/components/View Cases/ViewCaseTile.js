import React, { useEffect, useState } from 'react';
import './ViewCases'
import axios from 'axios';



export default function CaseTile({caseVar,editMode,listID}) {


    const [status, setStatus] = useState(caseVar.status)

    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";
    
    const updateCaseDB = (caseVar) => {


        axios.post(baseURL+'updateCase/',{
            case: caseVar,
            listID: listID
            

        }).then( (response) => {
        
          const data = response.data;
          
          console.log(data)
        });

    }

    const checkFormat = (caseName) => {

        if(caseName.includes("-V-"))
        {
            return true
        }
        else{
            return false
        }

    }


    const onChangeValue = (event) => {
            console.log("Radio value",event.target.value);
            caseVar.status = event.target.value
            setStatus(caseVar.status)

            console.log(caseVar.selected)
            updateCaseDB(caseVar)
    }

    return (
        <div className={`caseTile ${caseVar.selected?'selected':''} ${caseVar.id%2==0?'even':'odd'}`}>

            <div className={`caseName ${caseVar.status}`}>{caseVar.name}</div>
            
            {(!editMode && checkFormat(caseVar.name)) && <div className='caseStatus'>{caseVar.status}</div>}
            
            {(editMode && checkFormat(caseVar.name)) && 
                <div className='caseRadios' onChange={onChangeValue}>
                    <input disabled='true' className='caseRadio' type="radio" value="Live" name={`status${caseVar.id}`} checked={caseVar.status==="Live"} /> 
                    <input className='caseRadio' type="radio" value="Complete" name={`status${caseVar.id}`} checked={caseVar.status==="Complete"} /> 
                    <input className='caseRadio' type="radio" value="SecondCall" name={`status${caseVar.id}`}  checked={caseVar.status==="SecondCall"}/> 
                </div>
            
            }

        </div>
    )
}
