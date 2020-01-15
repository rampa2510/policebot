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
                            <>{suspect}</>
                        );
                    else
                        return(
                            <>{suspect}, </>
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
            </>
        
    );
}

export default Crime;