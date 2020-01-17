import React from 'react';

const EmergencyReport = props=>{

    const item=props["data"];

    return(
        
            <>
            <p>Name: {item["name"]}</p>
            <p>Address: {item["addr"]}</p>
            </>
        
    );
}

export default EmergencyReport;