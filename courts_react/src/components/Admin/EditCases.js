import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useMemo,useCallback } from 'react';
import '../View Cases/ViewCases.css'
import './editCases.css'
import { Oval } from  'react-loader-spinner'
import CaseTile from '../View Cases/ViewCaseTile';
import AdminToolbar from '../Admin/editCasesToolbar';
import { useNavigate } from "react-router-dom";

function EditCasesScreen({listID}) {


    const [cases, setCases] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [input, setInput] = useState(''); 

    const [loading, setLoading] = useState(false)
    const [addingCase, setAddingCase] = useState(false)
    const [editMode,setEditMode] = useState(false)

    const [addedListener,setAddedListener] = useState(null)

    var casesG = [1]


    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";
    const navigate = useNavigate();

    const loadCases = async() => {

        

        axios.get(baseURL+'getListByID',{
            
            params:{
                id: listID
            }

        
        }).then( (response) => {
        
            const data = response.data;

            let caseArr = []
            
            data.cases.forEach(caseVar => {
                caseArr.push(caseVar)
            });

            console.log(data)

            setCases(caseArr)
            setLoading(false)
            
        });
    
        
    }

    const updateCaseDB = async(caseVar) => {

        

        axios.post(baseURL+'updateCase',{
            
            listID:listID,
            case:caseVar

        
        }).then( (response) => {
        
            const data = response.data;
            console.log(data)

        });
    
        
    }



    const addCaseDB = async(newCase) => {

        

        axios.post(baseURL+'addOneCase',{
            
            listID:listID,
            newCase:newCase

        
        }).then( (response) => {
        
            const data = response.data;
            console.log(data)

        });
    
        
    }

    const checkFormat = (caseName) => {

        if(caseName.includes("-V-"))
        {
            return true
        }
        else{
            return false
        }

    }

    


    const highlightSelectedCase = () =>
    {

        if(selectedIndex !== -1)
        {
            var caseArr = cases
            caseArr[selectedIndex].selected = true
            setCases(caseArr)
        }
    }

    const removeSelectedHighlight = () =>
    {
        var caseArr = cases
        caseArr[selectedIndex].selected = false
        setCases(caseArr)
    }


    const findSelectedIndex = async(listLiveClick) =>
    {
        return new Promise(async (resolve, reject) => {

            if(listLiveClick && selectedIndex !== -1)
            {
                highlightSelectedCase()
            }else{

                var found = false
                var index  =  0
                let caseArr = cases
            
            caseArr.forEach(caseVar => {
               
                if(!found && (caseVar.status === "None" || caseVar.status === "Live")  && checkFormat(caseVar.name)){
                    
                    if(selectedIndex !== -1){
                        caseArr[selectedIndex].selected = false
                    }
                    else{
                        console.log("it is",selectedIndex)
                    }
                    
                    found = true
                    caseVar.selected = true
                    caseVar.status = "Live"
                    setCases(caseArr)
                    setSelectedIndex(index)
                    
                    updateCaseDB(caseVar)

                }
                
                index++
            });

            if(!found){
                
                caseArr[selectedIndex].selected = false
                setSelectedIndex(null)
            }

                setCases(caseArr)
            }
            resolve()
        })

    }

    const getStatusFromKeyCode  = (keyCode) => {

        switch(keyCode)
        {
            case 49: return "Live"
            case 50: return "Complete"
            case 51: return "SecondCall"
        }

    }

    function getStateValues(){

        return({cases:cases,selectedIndex:selectedIndex,casesG:casesG})
    }

    const  keyPressed = useCallback((event) => {

        console.log("Key Pressed",selectedIndex,editMode)

        if(editMode)
        {

            
            console.log("Key Pressed",selectedIndex,editMode)
            let caseArr = cases
            if(event.keyCode ===  50 ||  event.keyCode ===  51)
            {
                let status  = getStatusFromKeyCode(event.keyCode)
                window.removeEventListener('keydown', keyPressed,true);

                caseArr[selectedIndex].status = status
                updateCaseDB(caseArr[selectedIndex])


                setCases(caseArr)
                findSelectedIndex(false)
            }
        }

            

            

        

    },[selectedIndex]);


    

    


    const addCaseLocally = (newCase) => {
        
        var caseArr = cases
        caseArr.push(newCase)
        setCases(caseArr)
    }

    

    const toolbarClicked = async(button) => {
        console.log("BTN", button,selectedIndex)

        if(button === "Home"){navigate("../", { replace: true });}
        if(button === "AddItem"){setAddingCase(true)}
        if(button === "Live"){
            
            setEditMode(true)
            await findSelectedIndex(true)
           
        }
        if(button === "Not Live"){
            removeSelectedHighlight()
            setEditMode(false)

        }
    }

    const addCaseCancel = () => {
        setAddingCase(false)
        setInput("")
    }

    const addCaseClicked = () => {

        let id = cases.length

        let newCase = {id:id,name:input,selected:false,status:"None"}

        addCaseLocally(newCase)
        addCaseDB(newCase)
        setAddingCase(false)
        setInput("")
    }


    useEffect(async () => {
        

        setLoading(true)
        loadCases()
 
    }, []);


    useEffect(async () => {
        
        highlightSelectedCase()
 
    }, [selectedIndex]);

    useEffect(async () => {


        
        window.addEventListener('keydown', keyPressed,true);
      
      return () => {
      
        window.removeEventListener('keydown', keyPressed,true);
      };
    
      
        
    }, [keyPressed]);


    return(
        <div className="container">

        <AdminToolbar buttonClicked={toolbarClicked} liveMode={editMode}/>
           
            {(!loading) && <div>


            <div className="casesHeaders">
                <div className="headerName">Name</div>
                <div className="headerEdit">
                    <div>Live</div>
                    <div>Completed</div>
                    <div>Second Call</div>
                </div>

            </div>
            
                

            {cases.map((caseVar) => (
            // <div onClick={() => eventTileClicked(eventIns)}>
            <CaseTile caseVar={caseVar} editMode={true} listID={listID}/>
            // </div>
            ))}

            {(addingCase) && <div className='addCase'>

            <input className="addCaseInput" type="text" placeholder='Case Name' value={input} onInput={e => setInput(e.target.value)}/>
            <div className='addCaseBtnDiv'>
                <button className='addCaseCancel' onClick={addCaseCancel}>Cancel</button>
                <button className='addCaseSubmit' onClick={addCaseClicked}>Submit</button>
                </div>
            </div>}

            </div>}


        </div>
    )

}

export default EditCasesScreen