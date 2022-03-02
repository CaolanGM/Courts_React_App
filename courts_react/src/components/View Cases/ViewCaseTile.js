import React, { useEffect, useState } from 'react';
import './ViewCases'

export default function CaseTile({caseVar,editMode}) {


    const [status, setStatus] = useState(caseVar.status)


    const onChangeValue = (event) => {
            console.log("Radio value",event.target.value);
            caseVar.status = event.target.value
            setStatus(caseVar.status)

            console.log(caseVar.selected)
    }

    return (
        <div className={`caseTile ${caseVar.selected?'selected':''}`}>

            <div className={`caseName ${caseVar.status}`}>{caseVar.name}</div>
            
            {(!editMode && caseVar.name.includes("v")) && <div className='caseStatus'>{caseVar.status}</div>}
            
            {(editMode && caseVar.name.includes("v")) && 
                <div className='caseRadios' onChange={onChangeValue}>
                    <input className='caseRadio' type="radio" value="Live" name={`status${caseVar.id}`} checked={caseVar.status==="Live"} /> 
                    <input className='caseRadio' type="radio" value="Complete" name={`status${caseVar.id}`} checked={caseVar.status==="Complete"} /> 
                    <input className='caseRadio' type="radio" value="SecondCall" name={`status${caseVar.id}`}  checked={caseVar.status==="SecondCall"}/> 
                </div>
            
            }

        </div>
    )
}
