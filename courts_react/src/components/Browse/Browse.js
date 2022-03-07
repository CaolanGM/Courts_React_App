import React, { useEffect, useState } from 'react';
import  './Browse.css'

import ViewCourts  from './ViewCourts.js'
import ViewListLists from './ViewListLists';
import ViewListTypes from './ViewListTypes';
import ViewCasesScreen from '../View Cases/ViewCases';

import { useNavigate } from "react-router-dom";


export default function Browse({authenticated}) {

    const [showAddList,setShowAddList] = useState(localStorage.getItem("authID") !== null)

    const [showCourts, setShowCourts] = useState(true)
    const [court, setCourt] = useState("")


    const [showListTypes, setShowListTypes] = useState(false)
    const [listType, setListType] = useState("")

    const [showListLists, setShowListLists] = useState(false)
    const [list, setList] = useState("")

    const [showListCases, setShowListCases] = useState(false)
    
    const navigate = useNavigate();


    const courtClicked = (court) => {

        setCourt(court)
        setShowCourts(false)
        setShowListTypes(true)
    }

    const listTypeClicked = (listType) => {

        setListType(listType)
        setShowListTypes(false)
        setShowListLists(true)
    }

    const listClicked = (listName) => {

        setList(listName)
        setShowListLists(false)
        setShowListCases(true)

    }

    const backToCourtsClicked = () => {

        setShowCourts(true)
        setShowListTypes(false)
    }

    const backToListTypesClicked = () => {

        setShowListTypes(true)
        setShowListLists(false)
    }

    const backToListsClicked = () => {

        setShowListLists(true)
        setShowListCases(false)
    }

    const addList = () => {
        navigate("../addList", { replace: true });

    }


    return (
        <div className="browse">

            

            {/* Show Courts */}
            {showCourts && <div>
                
                {showAddList && <div>
                
                <button className="courtTile addList" onClick={addList}>Add List</button>
                
                </div>}


                <ViewCourts clicked={courtClicked}/>
                
                </div>}


            {/* Show List Types */}
            {showListTypes && <div>
                
                <ViewListTypes clicked={listTypeClicked} court={court} backClicked={backToCourtsClicked}/>
                
                </div>}

            
            {/* Show List of Lists */}
            {showListLists && <div>
                
                <ViewListLists clicked={listClicked} listType={listType} backClicked={backToListTypesClicked}/>
                
                </div>}


            {/* Show List of Cases */}
            {showListCases && <div>
                
                <ViewCasesScreen 
                backClicked={backToListsClicked} 
                court={court}
                listType={listType}
                listName={list}
                editMode={authenticated}/>
                
                </div>}    
        
        </div>
    )
}
