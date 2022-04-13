import React, { useEffect, useState } from 'react';
import axios from "axios";


import './ViewCases.css'
import { Oval } from  'react-loader-spinner'
import CaseTile from './ViewCaseTile';
import AdminToolbar from '../Admin/editCasesToolbar';
import { useNavigate } from "react-router-dom";

function ViewCasesScreen({list}) {



    const [cases, setCases] = useState(list.cases)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [loading, setLoading] = useState(false)
    const [addingCase, setAddingCase] = useState(true)

    const [lastUpdated,setLastUpdated] = useState(null)
    const [ticking, setTicking] = useState(true)


    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";

    
    



    const loadCases = async() => {

        

        axios.get(baseURL+'getListByIDUpdates',{
            
            params:{
                id: list.id,
                lastUpdated:lastUpdated
            }

        
        }).then( (response) => {
        
            var caseArr = cases

            const data = response.data;
            
            data.cases.forEach(caseVar => {
                caseArr[+caseVar.id] = caseVar
            });

            console.log(data)

            setCases(caseArr)
            setLoading(false)
        });
    
        
       

    }

    
    useEffect(async () => {

 
    }, []);


    useEffect(async () => {


        setTimeout(() => {  
            console.log('Cant help it',lastUpdated);
            localStorage.setItem("RefreshList", null)

            let date = new Date()
            let time = date.getTime()

            if(lastUpdated !== null)
            {
                loadCases()
            }

            setLastUpdated(time)


         }, 1000);

        

    }, [lastUpdated]);


    useEffect(() => {
        window.addEventListener("beforeunload", saveList);
        return () => {
          window.removeEventListener("beforeunload", saveList);
        };
      }, []);


      const saveList = (e) => {
        console.log("REFRESH", e)
        var listVar = list
        listVar.cases = cases
        localStorage.setItem("RefreshList", JSON.stringify(listVar))
      };

    return(
        <div className="container">

        
        



            {/* <h2>{court} - {listType}: {listName}</h2> */}
            
           
            {(cases!==undefined) && <div className='casesScreen'>


            <div className="casesHeaders">
                <div className="headerName">Name</div>
                <div className="headerStatus">Status</div>
            </div>
            
                

            {cases.map((caseVar) => (
            <CaseTile caseVar={caseVar} editMode={false} />
            ))}


          


            </div>}


        </div>
    )

}

export default ViewCasesScreen