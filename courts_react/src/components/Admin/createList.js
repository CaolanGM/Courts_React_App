import React, { useEffect, useState } from 'react';
import  './admin.css'
import Dropdown from './Dropdown';
import axios from 'axios';
import ViewCasesScreen from '../View Cases/ViewCases';
import { Oval } from  'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import EditCasesScreen from './EditCases';

export default function CreateList({param}) {

    // var caseArrayG = []

    const [listID, setListID] = useState("")
    const [court, setCourt] = useState("")
    const [listType, setListType] = useState("")
    const [dateStr, setDateStr] = useState("")
    const [caseArrayG,setCaseArray] = useState([])

    const [loading,setLoading] = useState(false)

    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";
    const navigate = useNavigate();

    const courts = [
        {id: 0, name:"High Court", value:[
            { name:"Today's Cases / All Lists",id:"Today's Cases / All Lists"},
            { name:"Advance Warning",id:"Advance Warning"},
            { name:"Asylum",id:"Asylum"},
            { name:"Bail List",id:"Bail List"},
            { name:"Bankruptcy",id:"Bankruptcy"},
            { name:"Chancery",id:"Chancery"},
            { name:"Chancery Summonses",id:"Chancery Summonses"},
            {name:"Commercial",id:"Commercial"},
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

    
    const [courtOptions, setCourtOptions] = useState(courts)
    const [listTypeOptions, setListTypeOptions] = useState([])


    const [courtSelected,setCourtSelected] = useState(false)
    const [listTypeSelected,setListSelected] = useState(false)
    const [dateSelected,setDateSelected] = useState(false)
    const [fileAdded,setFileAdded] = useState(false)

    const [showListCases, setShowListCases] = useState(false)


    const onFileChange = (e) => {

        const file = e.target.files[0];
            const reader = new FileReader();
            var index = 0
            reader.onload = e => {


                var caseArray = []

            let lines = e.target.result.split(/\r?\n/);

                    lines.forEach(function (line) {
                    //    console.log("Line " + index + " " + line + " ")

                    caseArray.push({number:index,name:line,status:"None", one:index+" 1",two:index+" 2",three:index+" 3",four:index+" 4"})
                        index++

                    }); 

                    // console.log("cases",caseArray)
                    setCaseArray(caseArray)


            }
            reader.readAsText(file);
            setFileAdded(true)

    } 

    

    const addListDB = async(caseArray) => {


        // console.log("params",court,dateStr,listType)
        return new Promise(async (resolve, reject) => {

            await axios.post(baseURL+'addCases/',{
                cases: caseArray,
                dateStr:dateStr,
                court:court,
                listType:listType
                


        
            }).then( (response) => {
            
            const data = response.data;
            
            resolve(data.id)
            });

        })

    }


    const uploadList = async() => {

        setLoading(true)
        console.log("cases uploadList",caseArrayG)
        if(caseArrayG.length > 0 ){
            
  
            var caseArray = []
            for(const caseVar of caseArrayG)
            {
              if(caseArray.length === 50){
                addListDB(caseArray)
                caseArray = []
              }
              caseArray.push(caseVar)
            }
            let id = await addListDB(caseArray)
            setListID(id)

            setTimeout(() => {  
                setLoading(false)
                setShowListCases(true)
                
             }, 10000);

            
            
        }
        else{
            console.log("List empty")
        }

    }



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

    const goHome = () => {

        navigate("../", { replace: true });
    }


    return (
        <div className='addListScreen'>
            <h1>{param}</h1>
           {!showListCases &&  <div className="addListDisplay">

           {!loading && <div className='addListContainer'>

                    <div>Create List</div>

                    <div className='addListFilters'>

                        <div className='addListInput'>
                            <div>Court</div>
                            <Dropdown data={courtOptions} onChange={courtChanged}/>
                        </div>
                        <div className='addListInput'>
                            <div>List Type</div>
                            <Dropdown data={listTypeOptions} onChange={listTypeChanged}/>
                        </div>
                        <div className='addListInput'>
                            <div>Date</div>
                            <input type="date" onChange={dateChanged}/>
                        </div>

                    </div>


                    <form className={`fileForm ${(courtSelected&&listTypeSelected&&dateSelected)?"":"disabled"}`}
                    encType="multipart/form-data" disabled={!(courtSelected&&listTypeSelected&&dateSelected)} onChange={onFileChange}>
                    <span class="tooltiptext">Select Court, List Type and Date</span>
                    <input className='fileInput' type="file" disabled={!(courtSelected&&listTypeSelected&&dateSelected)} onChange={onFileChange}/>
                    </form>

                    <div className="addListFooter">
                        <button className='footerButton' onClick={goHome}>Home</button>
                        <button className='footerButton next'
                        disabled={!(courtSelected&&listTypeSelected&&dateSelected&&fileAdded)}
                        onClick={uploadList}>Next
                            <span class="tooltiptext">Upload file</span>
                        </button>
                    </div>

                </div>}
            
                {loading && <Oval height="100" width="100" color='grey' ariaLabel='loading'/>}
                
                
            </div>}

            

            {showListCases && <div>
                    
                    <EditCasesScreen 
                    
                    listID={listID}/>
                    
                    </div>}   
        </div>
    )
}
