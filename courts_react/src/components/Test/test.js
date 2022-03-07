import React, { useEffect, useState } from 'react';


export default function Test() {


    


    const onFileChange = (e) => {

        const file = e.target.files[0];
            const reader = new FileReader();
            var index = 0
            reader.onload = e => {


              let array = []

            let lines = e.target.result.split(/\r?\n/);

                    lines.forEach(function (line) {
                       console.log("Line " + index + " " + line + " ")

                        array.push({number:index,name:line,status:"None", one:index+" 1",two:index+" 2",three:index+" 3",four:index+" 4"})
                        index++

                    }); 

                // updateList(array)

            }
            reader.readAsText(file);
    } 


    return (
        <div className="viewListType">

            
        <div class = "clearBtn">
            <form enctype="multipart/form-data">
                <input type="file" onChange={onFileChange}/>
            </form>
        </div>
            
            
        </div>
    )
}
