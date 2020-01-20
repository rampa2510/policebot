import React from 'react';

const EmergencyReport = props=>{

    const item=props["data"];

    const checkAddr = ()=>{
        if(item["addr"]==null)
            return item["display_name"]
        else return item["addr"];
    }
    
    return(
            <div style={{color:"black"}}>
            <p><b>Name:</b> {item["name"]}</p>
            <p><b>Address:</b> {checkAddr()}</p>
            </div>
        
    );
}

export default EmergencyReport;