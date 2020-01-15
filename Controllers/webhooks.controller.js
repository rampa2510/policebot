//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const {findOne} = require('../Helpers/queryHandler')

module.exports.webhookController=async (req,res)=>{
  const {caseNo} = req.body.queryResult.parameters;
  let textResponse
  try {
    const {status,investigatingOfficer,crime} = await findOne('crimeRegister',{caseNo});

    textResponse = status==="pending"?`The case for ${crime} crime is on status pending. We are trying to assign a investigation officer to the case as soon as possible`:status==="ongoing"?`The case of ${crime} crime has a status of ongoing. The Investigating officer is ${investigatingOfficer}`:`The case of ${crime } that you reported is completed by officer ${investigatingOfficer}`;
  
  } catch (error) {
    textResponse = `No such case with case number ${caseNo} please enter a correct case no`
  }
  const responseObj  = {
    "fulfillmentText": "This is a text response",
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