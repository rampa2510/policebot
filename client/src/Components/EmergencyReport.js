import React from 'react';

const EmergencyReport = props=>{

    const item=props["data"];

    const checkAddr = ()=>{
        if(item["addr"]==null)
            return item["display_name"]
        else return item["addr"];
    }
    
    return(
            <>
            <p>Name: {item["name"]}</p>
            <p>Address: {checkAddr()}</p>
            </>
        
    );
}

export default EmergencyReport;