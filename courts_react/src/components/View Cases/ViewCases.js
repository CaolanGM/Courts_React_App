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

        // let firstDate = new Date()
        // let firsTime = firstDate.getTime()
        // setLastUpdated(firsTime)

        // const timer = setTimeout(() => ticking && updateTime(), 1e3)
        // return () => clearTimeout(timer)


        // const interval = setInterval(() => {
        //     console.log('Logs every minute',lastUpdated);

        //     let date = new Date()
        //     let time = date.getTime()
        //     setLastUpdated(time)
        //   }, 3000);
        
        //   return () => clearInterval(interval); 

        // job.start();


        // let date = new Date()
        // let time = date.getTime()
        // setLastUpdated(time)
 
    }, []);


    useEffect(async () => {

        setTimeout(() => {  
            console.log('Cant help it',lastUpdated);
            
            let date = new Date()
            let time = date.getTime()

            if(lastUpdated !== null)
            {
                loadCases()
            }

            setLastUpdated(time - 1000)


         }, 4000);

        

    }, [lastUpdated]);

    return(
        <div className="container">

        
        



            {/* <h2>{court} - {listType}: {listName}</h2> */}
            
           
            {(cases!==undefined) && <div>


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