import React from 'react';

const Crime = props=>{

    const item=props["data"];

    const getSuspects = ()=>{
        if(item["personArr"].length>0)
            return(
                <>
                {item["personArr"].map((suspect,index)=>{
                    if(index===item["personArr"].length-1)
                        return(
                            <React.Fragment key={index}> {suspect}</React.Fragment>
                        );
                    else
                        return(
                            <React.Fragment key={index}> {suspect},</React.Fragment>
                        );
                })}
                </>
            );
    }

    const getUpdates = ()=>{
        if(item["updates"]!=null && item["updates"].length>0)
            return(
                <>
                {item["updates"].map((update,index)=>{
                    return(
                        <React.Fragment key={index}> <li>{update.date.substring(8,10)+'/'+update.date.substring(5,7)+'/'+update.date.substring(0,4)} - {update.details}</li></React.Fragment>
                    );
                })}
                </>
            );
    }

    return(
        
            <>
            <p style={{color:"black"}}>Case No:{item["caseNo"]}</p>
            <p style={{color:"black"}}>Reported By: {item["name"]}</p>
            <p style={{color:"black"}}>Crime: {item["crime"]}</p>
            <p style={{color:"black"}}>City: {item["city"]}</p>
            <p style={{color:"black"}}>Suspects:{getSuspects()}</p>
            <p style={{color:"black"}}>Date of Crime: {item["date"].substring(8,10)+'/'+item["date"].substring(5,7)+'/'+item["date"].substring(0,4)}</p>
            <p style={{color:"black"}}>Status: {item["status"]}</p>
            <p style={{color:"black"}}>Details: {item["details"]}</p>
            <p style={{color:"black"}}>{getUpdates()}</p>
            </>
        
    );
}

export default Crime;