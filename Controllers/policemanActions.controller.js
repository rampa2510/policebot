//========================================================================================
/*                                                                                      *
 *                            Import all the helper functions                           *
 *                                                                                      */
//========================================================================================
const {findAll,updateOne,deleteOne,findOne,updateDetails} = require('../Helpers/queryHandler')
const client = require('twilio')("ACd68a6040106a2b0d3ebc3d2143f1a5ba","8efb9f0856c00bd17eced4b801f2c887");
//########################################################################################
module.exports.getMyCrimes =async (req,res,next)=>{
  const {data} = res.locals;
  try {
    // console.log({$and : [{caseNo:id},{name:data.name}]})
    const crimeData = await findAll('crimeRegister',{$and : [{investigatingOfficer:data.name} ]})
    // console.log(crimeData)
    res.status(200).json({crimeData})
    next()
  } catch (error) {
    // console.log(error)
    res.status(500).json({error})
    next()
  }
}

module.exports.getAllCrimes =async (req,res,next)=>{
  try {
    // console.log({$and : [{caseNo:id},{name:data.name}]})
    const crimeData = await findAll('crimeRegister',{$and : [{investigatingOfficer:"none"}]})
    // console.log(crimeData)
    res.status(200).json({crimeData})
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
    next()
  }
}

module.exports.startInvestigation=async (req,res)=>{
  try {
    const { caseNo } = req.body;
    const {data} = res.locals;
    const isInvestigationOngoing = await findOne('crimeRegister',{caseNo:caseNo,status:"ongoing"})
    if(isInvestigationOngoing) return res.status(409).send({message:"the case is already ongoing"})
    const isCaseDataUpdated = await updateOne('crimeRegister',{caseNo},{$set:{investigatingOfficer:data.name,status:"ongoing"}})
    // console.log(isCaseDataUpdated)

    if(isCaseDataUpdated){ 
      client.messages.create({
        from: 'whatsapp:+14155238886',
        to:'whatsapp:+917666137800',
        body: 'Investigation of case number: '+caseNo+' has been started by: Inspector: '+data.name
      })
      return res.status(200).send({message:"Case data updated successfully"});
    }
    else return res.status(404).send({error:"Couldn't update case data"});
    
  } catch (error) {
    // console.log(error);
    res.status(500).send({error})
  }
}

module.exports.finishInvestigation=async (req,res)=>{
  try {
    const { caseNo } = req.body;
    const {data} = res.locals;
    const isCaseDataUpdated = await updateOne('crimeRegister',{caseNo},{$set:{status:"completed"}})
    // console.log(isCaseDataUpdated)

    if(isCaseDataUpdated){ 
      client.messages.create({
        from: 'whatsapp:+14155238886',
        to:'whatsapp:+917666137800',
        body: 'Investigation of case number: '+caseNo+' has been completed by inspector: '+data.name
      })
      return res.status(200).send({message:"Case data updated successfully"});}
    else return res.status(404).send({error:"Couldn't update case data"});
    
  } catch (error) {
    // console.log(error);
    res.status(500).send({error})
  }
}

module.exports.deleteCrimeData=async (req,res)=>{
  const caseNo = parseInt(req.params.caseNo);
  const {data} = res.locals;
  try {
    const isCaseDeleted = await deleteOne('crimeRegister',{caseNo});
    if(isCaseDeleted){ 
      client.messages.create({
        from: 'whatsapp:+14155238886',
        to:'whatsapp:+917666137800',
        body: 'Case Number: '+caseNo+' has been dismissed by inspector: '+data.name
      })
      return res.status(200).send({message:"Case deleted!"});
    }
    else return res.status(404).send({error:"Case cannot be found"})
  } catch (error) {
    console.log(error);
    res.status(500).send({error})
  }
}

module.exports.updateDetails=async (req,res)=>{
  const {details,date,caseNo} = req.body;
  let textResponse;
  const data = await findOne('crimeRegister',{caseNo});

  if(!data){
    textResponse=`Case with case no ${caseNo} does not exits please enter a valid case number`
  }else{
    await updateDetails({caseNo},{details,date});
    textResponse = "Case details updated!"
  }

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
  res.send(responseObj);
}