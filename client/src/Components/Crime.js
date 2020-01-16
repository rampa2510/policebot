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
            <p>Case No: {item["caseNo"]}</p>
            <p>Reported By: {item["name"]}</p>
            <p>Crime: {item["crime"]}</p>
            <p>City: {item["city"]}</p>
            <p>Suspects:{getSuspects()}</p>
            <p>Date of Crime: {item["date"].substring(8,10)+'/'+item["date"].substring(5,7)+'/'+item["date"].substring(0,4)}</p>
            <p>Status: {item["status"]}</p>
            <p>Details: {item["details"]}</p>
            <p>{getUpdates()}</p>
            </>
        
    );
}

export default Crime;