import React, { useEffect, useState } from 'react';
import  './viewLists.css'
import  {useParams} from 'react-router-dom'
import Dropdown from '../Admin/Dropdown';

export default function ListFilters({courtParam}) {
    
    const courts = [
        {id: 0, name:"High Court", value:[
            { name:"Common Law 1",id:"Common Law 1"},
            {name:"Commercial",id:"Commercial"},
            { name:"Non-Jury",id:"Non-Jury"},
        ]},
        {id: 1, name:"Supreme Court", value:[
            { name:"Supreme Court",id:"Supreme Court"}
        ]},
    ]

   
    const [court, setCourt] = useState("")
    const [listType, setListType] = useState("")
    const [dateStr, setDateStr] = useState("")
    const [courtOptions, setCourtOptions] = useState(courts)
    const [listTypeOptions, setListTypeOptions] = useState([])
    const [courtSelected,setCourtSelected] = useState(false)
    const [listTypeSelected,setListSelected] = useState(false)
    const [dateSelected,setDateSelected] = useState(false)




    const courtChanged = (courtID) => {

        let listOptions = courts[courtID].value
        setCourt(courts[courtID].name)

        setCourtSelected(true)
        setListSelected(false)
        setListTypeOptions(listOptions)

        console.log("list options length",listOptions.length)
        if(listOptions.length === 1){
            
            setListSelected(true)
            setListType(listOptions[0].id)
        }
    }

    
    const listTypeChanged = (listTypeP) => {
        setListSelected(true)
        setListType(listTypeP)
    }

    const dateChanged = (event) => {

        console.log("DATEW CHAN", event.target.value)
        let dateStrP = event.target.value
        setDateSelected(true)
        setDateStr(dateStrP)
    }

    const [initalCourt, setInitialCourt] = useState("y")

    const setInitialCourtFunc = () => {

        console.log("Court Param",courtParam)

        courts.forEach(courtVar => {
            if(courtVar.name === courtParam)
            {
                console.log("Court Param found",courtVar.id)
                setInitialCourt(courtVar.id)
                setListTypeOptions(courtVar.value)
                return(courtVar.id)
            }
        });
    }

    
    
    useEffect(async () => {

       setInitialCourtFunc()
 
    }, []);

    return (
        <div className="listFilters">

            <div className='addListInput'>
                <div>Court</div>
                <Dropdown data={courtOptions} onChange={courtChanged} initialValue={initalCourt}/>
            </div>
            <div className='addListInput'>
                <div>List Type</div>
                <Dropdown data={listTypeOptions} onChange={listTypeChanged}/>
            </div>
            <div className='addListInput'>
                <div>Date</div>
                <input type="date" onChange={dateChanged}/>
            </div>


            <div className='rightSide'>
                <button className='currentlyActiveBtn'>Currently Active</button>
            </div>
            
            
        </div>
    )
}
