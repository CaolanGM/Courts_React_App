import React, { useEffect, useState } from 'react';
import  './Browse.css'

import ViewCourts  from './ViewCourts.js'
import ViewListLists from './ViewListLists';
import ViewListTypes from './ViewListTypes';
import ViewCasesScreen from '../View Cases/ViewCases';

export default function Browse({authenticated}) {


    const [showCourts, setShowCourts] = useState(true)
    const [court, setCourt] = useState("")


    const [showListTypes, setShowListTypes] = useState(false)
    const [listType, setListType] = useState("")

    const [showListLists, setShowListLists] = useState(false)
    const [list, setList] = useState("")

    const [showListCases, setShowListCases] = useState(false)
    
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


    return (
        <div className="browse">

            {/* Show Courts */}
            {showCourts && <div>
                
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
