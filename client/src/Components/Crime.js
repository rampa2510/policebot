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
                <b>Updates:</b> 
                {item["updates"].map((update,index)=>{
                    return(
                        <React.Fragment key={index}> <li>{update.date.substring(8,10)+'/'+update.date.substring(5,7)+'/'+update.date.substring(0,4)} - {update.details}</li></React.Fragment>
                    );
                })}
                </>
            );
    }

    const getImage = ()=>{
        if(item["url"])
            return(
                <img alt="crime" src={item["url"]}></img>
            );
    }

    return(
        
            <div style={{color:"black"}}>
                <p><b>Case No:</b> {item["caseNo"]}</p>
                <p><b>Reported By:</b> {item["name"]}</p>
                <p><b>Crime:</b> {item["crime"]}</p>
                <p><b>City:</b> {item["city"]}</p>
                <p><b>Number:</b> {item["number"]}</p>
                <p><b>Suspects:</b> {getSuspects()}</p>
                <p><b>Date of Crime:</b> {item["date"].substring(8,10)+'/'+item["date"].substring(5,7)+'/'+item["date"].substring(0,4)}</p>
                <p><b>Status:</b> {item["status"]}</p>
                <p><b>Details:</b> {item["details"]}</p>
                <p>{getImage()}</p>
                <p>{getUpdates()}</p>
            </div>
        
    );
}

export default Crime;