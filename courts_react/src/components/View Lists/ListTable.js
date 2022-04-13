import React, { useEffect, useState } from 'react';
import  './viewLists.css'
import ListRow from './ListRow';
import {FaChevronDown} from "react-icons/fa"


export default function ListTable({listData,onClick}) {

    const [lists, setLists] = useState([])

    

    const loadLists = (listData) => {

        var listArr = []
        console.log("List Data",listData)

        var index = 0
        listData.forEach(listVar => {
            
            listArr.push({id:listVar.id,date:listVar.date,listType:listVar.listType,subtitle:"", uploaded:" ",index:index,cases:listVar.cases})

            index ++
        });


        let AmountRows = 10
        while(index < AmountRows)
        {
            console.log("Adding")
            listArr.push({id:" ",date:" ",listType:" - ",subtitle:"", uploaded:" ",index:index})
            index++
        }

        setLists(listArr)

    }
    




    const sortTable = (n) => {

        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        //Set the sorting direction to ascending:
        dir = "asc"; 
        /*Make a loop that will continue until
        no switching has been done:*/
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch= true;
                break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
                }
            }
            }
            if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;      
            } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
            }
        }
    }

    const rowClick = (index) => {

        // console.log("Row Click",lists[index])
        onClick(lists[index])
    }

    
    useEffect(async () => {

        var listsVar = [
            {id:"123123",date:"28th February",listType:"Common Law 1",subtitle:"---", uploaded:"27th Feb",index:0},
            {id:"12123",date:"28th February",listType:"Common Law 1",subtitle:"---", uploaded:"27th Feb",index:1},
            {id:"12323",date:"28th February",listType:"Common Law 1",subtitle:"---", uploaded:"27th Feb",index:2}
        ]


        let AmountRows = 10
        var index = 3
        while(index < AmountRows)
        {
            console.log("Adding")
            listsVar.push({id:" ",date:" ",listType:" - ",subtitle:"", uploaded:" ",index:index})
            index++
        }

        setLists(listsVar)
        

    }, []);

    useEffect(async () => {

        loadLists(listData)

    },[listData]);

    return (
        // <div className='listTable'>
            
            <table className='listsTable' id='myTable'>
                <tr className='oddRow'>
                    <th onClick={()=>sortTable(0)}><span>Date</span><FaChevronDown /></th>
                    <th onClick={()=>sortTable(1)}>List Type</th>
                    <th onClick={()=>sortTable(2)}>Subtitle</th>
                    <th onClick={()=>sortTable(3)}>Uploaded</th>
                </tr>
                {lists.map((listVar) => (

                    <ListRow listVar={listVar} onClick={rowClick}/>
                    
                    
                ))}

                    

                </table>
            
        // </div>
    )
}
