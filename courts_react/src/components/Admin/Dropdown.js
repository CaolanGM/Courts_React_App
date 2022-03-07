import React, { useEffect, useState } from 'react';
import  './admin.css'

export default function Dropdown({data,onChange,initialValue}) {


    const [selectedValue, setSelectedValue] = useState(initialValue)
    const [onlyOne,setOnlyOne] = useState(data.length===1)
    
    useEffect(async () => {

        console.log("Inital value",selectedValue)
        

        if(data.length===1)
        {
            setOnlyOne(true)
            setSelectedValue(data[0].id)
        }
        else{
            setOnlyOne(false)
            setSelectedValue("")
        }
 
    }, [data]);


    const optionChanged = (event) => {

        console.log("OPT CHAN", event.target.value)
        setSelectedValue(event.target.value)
        onChange(event.target.value)
    }

    useEffect(async () => {

        setSelectedValue(initialValue)
  
     }, [initialValue]);

    return (
        <div>

        <select onChange={optionChanged} placeholder='Choose Court' value={selectedValue}>
            {!onlyOne && <option value="" disabled selected>Select your option</option>}
            {data.map((option) => (
                <option value={option.id}>{option.name}</option>
            ))}
        </select>
            
            
            
        </div>
    )
}
