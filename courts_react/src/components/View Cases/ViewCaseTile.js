import React, { useEffect, useState } from 'react';
import './ViewCases'

export default function CaseTile({caseVar,editMode}) {


    const [status, setStatus] = useState(caseVar.status)


    const onChangeValue = (event) => {
            console.log("Radio value",event.target.value);
            caseVar.status = event.target.value
            setStatus(caseVar.status)
    }

    return (
        <div className="caseTile">

            <div className={`caseName ${caseVar.status}`}>{caseVar.name}</div>
            
            {!editMode && <div>{caseVar.status}</div>}
            
            {editMode && 
                <div  onChange={onChangeValue}>
                    <input className='caseRadio' type="radio" value="Live" name={`status${caseVar.id}`} /> 
                    <input className='caseRadio' type="radio" value="Complete" name={`status${caseVar.id}`}  /> 
                    <input className='caseRadio' type="radio" value="SecondCall" name={`status${caseVar.id}`}  /> 
                </div>
            
            }

        </div>
    )
}
