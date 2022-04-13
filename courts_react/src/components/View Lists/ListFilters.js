import React, { useEffect, useState } from 'react';
import  './viewLists.css'
import  {useParams} from 'react-router-dom'
import Dropdown from '../Admin/Dropdown';
import { useNavigate } from "react-router-dom";

export default function ListFilters({courtParam, onChange}) {
    
    const courts = [
        {id: 0, name:"High Court", value:[
            { name:"Today's Cases / All Lists",id:"Today's Cases / All Lists"},
            { name:"Advance Warning",id:"Advance Warning"},
            { name:"Asylum",id:"Asylum"},
            { name:"Bail List",id:"Bail List"},
            { name:"Bankruptcy",id:"Bankruptcy"},
            { name:"Chancery",id:"Chancery"},
            { name:"Chancery Summonses",id:"Chancery Summonses"},
            { name:"Commercial",id:"Commercial"},
            { name:"Common Law 1",id:"Common Law 1"},
            { name:"Common Law 2",id:"Common Law 2"},
            { name:"Common Law 3",id:"Common Law 3"},
            { name:"Common Law 4",id:"Common Law 4"},
            { name:"Competition",id:"Competition"},
            { name:"Dental Council",id:"Dental Council"},            
            { name:"Examiner's Court List",id:"Examiner's Court List"},
            { name:"Examiner's Office List",id:"Examiner's Office List"},
            { name:"Extradition",id:"Extradition"},
            { name:"Family Law",id:"Family Law"},
            { name:"Garda Compensation",id:"Garda Compensation"},
            { name:"Hague - Luxembourg Convention",id:"Hague - Luxembourg Convention"},
            { name:"Hepatitis C",id:"Hepatits C"},
            { name:"Judicial Review",id:"Judicial Review"},
            { name:"Jury List",id:"Jury List"},
            { name:"Legal Costs Adjudicator's List",id:"Legal Costs Adjudicator's List"},
            { name:"Master's List",id:"Master's List"},
            { name:"Non-Jury List (Dublin)",id:"Non-Jury List (Dublin)"},
            { name:"Non-Jury List (Provincial)",id:"Non-Jury List (Provincial)"},
            { name:"Nurses Act",id:"Nurses Act"},
            { name:"Other Lists",id:"Other Lists"},
            { name:"Personal Injuries (Dublin)",id:"Personal Injuries (Dublin)"},
            { name:"Personal Injuries (Provincial)",id:"Personal Injuries (Provincial)"},
            { name:"Probate List",id:"Probate List"},
            { name:"Proceeds of Crime Act",id:"Proceeds of Crime Act"},
            { name:"Restrict-Disqualify Directors",id:"Restrict-Disqualify Directors"},
            { name:"Rulings",id:"Rulings"},
            { name:"Solicitor's Act",id:"Solicitor's Act"},
            { name:"Strategic Infrastructure Development",id:"Strategic Infrastructure Development"},
            { name:"Taxing Master's List",id:"Taxing Master's List"},
            { name:"Wards of Court",id:"Wards of Court"},
        ]},
        {id: 1, name:"Supreme Court", value:[
            { name:"Supreme Court",id:"Supreme Court"}
        ]},
    ]


   
    const [court, setCourt] = useState(null)
    const [listType, setListType] = useState(null)
    const [dateStr, setDateStr] = useState(null)
    const [courtOptions, setCourtOptions] = useState(courts)
    const [listTypeOptions, setListTypeOptions] = useState([])
    const [courtSelected,setCourtSelected] = useState(false)
    const [listTypeSelected,setListSelected] = useState(false)
    const [dateSelected,setDateSelected] = useState(false)


    const navigate = useNavigate();

    const courtChanged = (courtID) => {

        let listOptions = courts[courtID].value
        setCourt(courts[courtID].name)

        setCourtSelected(true)
        setListSelected(false)
        setListType(null)
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
                setCourt(courtVar.name)
                setCourtSelected(true)
                setListTypeOptions(courtVar.value)

                if(courtVar.value.length === 1){
            
                    setListSelected(true)
                    setListType(courtVar.value[0].id)
                }


                return(courtVar.id)
            }
        });
    }

    const comingSoon = () => {
        navigate("../comingSoon", { replace: true });
    }
    
    useEffect(async () => {

       setInitialCourtFunc()
 
    }, [courtParam]);

    useEffect(async () => {

        onChange(court,listType,dateStr)
  
     }, [court,listType,dateStr]);

    return (
        <div className="listFilters">

            <div className='addListInput ALI1'>
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
                <button className='currentlyActiveBtn' onClick={comingSoon}>Currently Active</button>
            </div>
            
            
        </div>
    )
}
