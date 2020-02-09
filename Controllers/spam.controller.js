//========================================================================================
/*                                                                                      *
 *                            Import all the helper functions                           *
 *                                                                                      */
//========================================================================================
const {updateOne, deleteOne, findOne} = require('../Helpers/queryHandler')
const client = require('twilio')("api key","pass");
//########################################################################################

module.exports.reportSpam = async (req,res)=>{
  const {data} = res.locals;
  const {name} = req.body
  const {caseNo} = req.body
  if(data.userType==="policeman"){
    const isStrikeAdded = await updateOne('users',{name},{$set:{lastStrikeAt:Date.now()},$inc:{strikes:1}});
    const isCaseDeleted = await deleteOne('crimeRegister',{caseNo});
    const userDetails = await findOne('users',{name:name});
    client.messages.create({
      from: 'whatsapp:+14155238886',
      to:'whatsapp:+91'+userDetails.phone.toString(),
      body: 'Your case having case number: '+caseNo+' has been marked as spam by inspector '+data.name
    })
    res.status(200).send({Message:"Spam reported"});
    return;
  }
  res.status(401).send({error:"Unauthorised"})
}