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
            <p style={{color:"black"}}><b>Name:</b> {item["name"]}</p>
            <p style={{color:"black"}}><b>Address:</b> {checkAddr()}</p>
            </>
        
    );
}

export default EmergencyReport;