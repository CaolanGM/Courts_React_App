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


    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";

    var caseArr = []
    



    const loadCases = async() => {

        

        axios.get(baseURL+'getListByID',{
            
            params:{
                id: list.id
            }

        
        }).then( (response) => {
        
            const data = response.data;
            
            data.cases.forEach(caseVar => {
                caseArr.push(caseVar)
            });

            console.log(data)

            setCases(caseArr)
            setLoading(false)
        });
    
        
    }



   

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