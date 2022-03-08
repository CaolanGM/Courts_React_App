import React, { useEffect, useState } from 'react';
import  './viewLists.css'
import  {useParams} from 'react-router-dom'
import ListFilters from './ListFilters';
import ListTable from './ListTable';
import ViewCasesScreen from '../View Cases/ViewCases';
import axios from "axios";

export default function ViewLists({clicked}) {


    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";

    let { courtName } = useParams();
    const [court, setCourt] = useState(null)
    const [lists, setLists] = useState([])

    
    

    const [showCases, setShowCases] = useState(null)
    const [selectedList, setSelectedList] = useState(null)


    const loadLists = (court,listType,dateStr) => {

        if(court !== null)
        {

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
        setShowCases(false)
        loadLists(court,listType,dateStr)
        setCourt(court)

    }

    useEffect(async () => {

        console.log("Court Name", courtName)
        setCourt(courtName)
     }, []);


    return (
        <div className="viewLists">

            <ListFilters courtParam={court} onChange ={filtersChanged}/>
            {/* <h2>{court}</h2> */}
            {!showCases &&<ListTable listData={lists} onClick={tableRowClicked}/>}
            {showCases && <ViewCasesScreen list={selectedList}/>}


        </div>
    )
}
