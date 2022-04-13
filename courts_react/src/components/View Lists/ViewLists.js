import React, { useEffect, useState } from 'react';
import  './viewLists.css'
import  {useParams} from 'react-router-dom'
import ListFilters from './ListFilters';
import ListTable from './ListTable';
import ViewCasesScreen from '../View Cases/ViewCases';
import EditCasesScreen from '../Admin/EditCases';
import axios from "axios";

export default function ViewLists({clicked}) {


    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";

    let { courtName } = useParams();
    const [court, setCourt] = useState(null)
    const [lists, setLists] = useState([])

    const [signedIn,setSignedIn] = useState(localStorage.getItem("authID") !== null)
    
    

    const [showCases, setShowCases] = useState(null)
    const [selectedList, setSelectedList] = useState(null)


    const loadLists = (court,listType,dateStr) => {


         //check for refresh
         let listVar = localStorage.getItem("RefreshList")
         let listIDVar = localStorage.getItem("RefreshListID")
        
         console.log("LIST VAR",listVar)

         if(listVar !== null && listVar !== "null")
         {
             let listParsed = JSON.parse(listVar)
             console.log("LIST PAR",listParsed)
             console.log("Setting list",listParsed.cases)
             setSelectedList(listParsed)
             setShowCases(true)
         }

         if(listIDVar !== null && listIDVar !== "null")
         {
             
             console.log("Setting list id",listIDVar)
             let listVar = {id:listIDVar}
             setSelectedList(listVar)
             setShowCases(true)
         }
    


        else if(court !== null)
        {
            setShowCases(false)

            axios.get(baseURL+'getLists',{
            
                params:{
                    court: court,
                    listType: listType,
                    date: dateStr
                }
    
            
            }).then( (response) => {
            
                const data = response.data;
                
                var listArr = []
    
                data.lists.forEach(listVar => {
                    listArr.push(listVar)
                });
    
                // console.log(data)
    
                setLists(listArr)
                
            });

        }
        else{
            setShowCases(false)
         }

        
    }



    const courtClicked = (court) => {

       clicked(court)
    }

    const tableRowClicked = (list) => {

        console.log("Table Row Clicked",list)
        setSelectedList(list)
        setShowCases(true)
     }

    const filtersChanged = (court,listType,dateStr) => {

        console.log("Filters",court,listType,dateStr)
        loadLists(court,listType,dateStr)
        // setCourt(court)

    }

    useEffect(async () => {

        console.log("Court Name", courtName)
        setCourt(courtName)


       

        
     }, []);


    return (
        
        <div className="viewLists">

            {!(showCases && signedIn ) &&<ListFilters courtParam={court} onChange ={filtersChanged}/>}
            {/* <h2>{court}</h2> */}
            <div className='container'>
            {!showCases &&<ListTable listData={lists} onClick={tableRowClicked}/>}

            </div>

            {(showCases && !signedIn ) && <ViewCasesScreen list={selectedList}/>}
            {(showCases && signedIn ) && <EditCasesScreen listID={selectedList.id}/>}

            

        </div>
    )
}
