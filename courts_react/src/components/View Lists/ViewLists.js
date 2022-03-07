import React, { useEffect, useState } from 'react';
import  './viewLists.css'
import  {useParams} from 'react-router-dom'
import ListFilters from './ListFilters';

export default function ViewLists({clicked}) {

    let { court } = useParams();
    // const [status, setStatus] = useState(caseVar.status)

    const courtClicked = (court) => {

       clicked(court)
    }


    return (
        <div className="viewLists">

            <ListFilters courtParam={court}/>
            <h2>{court}</h2>
            
        </div>
    )
}
