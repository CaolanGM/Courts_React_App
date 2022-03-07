import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function UploadCases() {


    const baseURL = "https://us-central1-courts-webapp.cloudfunctions.net/";




    const addListDB = (caseArray) => {



        axios.post(baseURL+'addCases/',{
            cases: caseArray,
            dateStr: "04-03-2022",
            court:"High Court",
            listType:"Morning List"
            


       
        }).then( (response) => {
        
          const data = response.data;
          
          console.log(data)
        });

    }

   
    const updateList = (listP) => {

        if(listP.length > 0 ){
            
  
            var caseArray = []
            for(const caseVar of listP)
            {
              if(caseArray.length === 50){
                addListDB(caseArray)
                caseArray = []
              }
              caseArray.push(caseVar)
            }
            addListDB(caseArray)
            
        }

    }
   


    const onFileChange = (e) => {

        const file = e.target.files[0];
            const reader = new FileReader();
            var index = 0
            reader.onload = e => {


              let array = []

            let lines = e.target.result.split(/\r?\n/);

                    lines.forEach(function (line) {
                    //    console.log("Line " + index + " " + line + " ")

                        array.push({number:index,name:line,status:"None", one:index+" 1",two:index+" 2",three:index+" 3",four:index+" 4"})
                        index++

                    }); 

                updateList(array)

            }
            reader.readAsText(file);
    } 


    return (
        <div className="viewListType">

            
        <div className = "clearBtn">
            <form encType="multipart/form-data">
                <input type="file" onChange={onFileChange}/>
            </form>
        </div>
            
            
        </div>
    )
}
