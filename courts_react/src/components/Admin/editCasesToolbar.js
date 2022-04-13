import React, { useEffect, useState } from 'react';
import axios from "axios";
import './admin.css'




function AdminToolbar({liveMode,buttonClicked}) {


    const [cases, setCases] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)

    


    useEffect(async () => {

    }, []);

   

    return(
        <div className="adminToolbar">

        <button className='adminButton home' onClick={() => buttonClicked("Home")}>Home</button>

            <div className='rightButtons'>

                <button className='adminButton addItem' onClick={() => buttonClicked("AddItem")}>Add Item</button>
                <button className='adminButton addItem' onClick={() => buttonClicked("Unset All")}>Unset All</button>
                {!liveMode && <button className='adminButton live' onClick={() => buttonClicked("Live")}>Make List Live</button>}
                {liveMode && <button className='adminButton live' onClick={() => buttonClicked("Not Live")}>Un-Live</button>}

            </div>

            
        </div>
    )

}

export default AdminToolbar