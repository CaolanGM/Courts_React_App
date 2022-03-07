import React, { useEffect, useState } from 'react';
import  './admin.css'
import Dropdown from './Dropdown';
import axios from 'axios';
import ViewCasesScreen from '../View Cases/ViewCases';
import { Oval } from  'react-loader-spinner'


export default function CreateList({param}) {

    // var caseArrayG = []

    const [listID, setListID] = useState("")
    const [court, setCourt] = useState("")
    const [listType, setListType] = useState("")
    const [dateStr, setDateStr] = useState("")
    const [caseArrayG,setCaseArray] = useState([])

    const [loading,setLoading] = useState(false)

    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";

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
                
             }, 3000);

            
            
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
                        <button className='footerButton'>Home</button>
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
                    
                    <ViewCasesScreen 
                    // backClicked={backToListsClicked} 
                    court={court}
                    listType={listType}
                    listName={dateStr}
                    editMode={true}
                    listID={listID}/>
                    
                    </div>}   
        </div>
    )
}
