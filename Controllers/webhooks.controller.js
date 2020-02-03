//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const {findOne} = require('../Helpers/queryHandler')
//########################################################################################

module.exports.webhookController=async (req,res)=>{
  const {caseNo} = req.body.queryResult.parameters;
  let textResponse
  try {
    const data = await findOne('crimeRegister',{caseNo});
    // console.log(data)
    textResponse = data.status==="pending"?"Case Number: " + data.caseNo + "\n Status: Pending"+"\n Crime - "+data.crime+" \n Date of crime: ;"+ data.date+";\n  Details: "+data.details+" An officer will be assigned to your case soon":
    data.status==="ongoing"?"Case Number: +"+data.caseNo+" \n Status: Ongoing \n Head Officer: "+data.investigatingOfficer+" \n Date of crime -;"+ data.date+"; \nType of crime -"+ data.crime:
    "The case number -"+ data.caseNo+" filed by you has been successfully completed.\n For any queries please feel free to ask us on the queries section on your personal dashboard.";
    
    if(data.status==="ongoing" && data.updates.length){
      data.updates.forEach((item,i)=>{
        let date = item.date;
        date = new Date(date);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();    
        textResponse+=`\n Updates: ${i} - ${item.details} , Date of update - ${day}-${month+1}-${year}\n`
      })
    }
    console.log(textResponse)
  } catch (error) {
    console.log(error)
    textResponse = `No such case with case number ${caseNo} please enter a correct case no`
  }
  // console.log(textResponse)
  const responseObj  = {
    "fulfillmentText": textResponse,
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            textResponse
          ]
        }
      }
    ],    
  }
  res.send(responseObj)

}