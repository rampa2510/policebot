//========================================================================================
/*                                                                                      *
 *                            Import all the helper functions                           *
 *                                                                                      */
//========================================================================================
const {findAll,updateOne,deleteOne,findOne,updateDetails,insertOne} = require('../Helpers/queryHandler')
const client = require('twilio')("ACd68a6040106a2b0d3ebc3d2143f1a5ba","8efb9f0856c00bd17eced4b801f2c887");
const { sign } = require("jsonwebtoken");
const hashPass = require("../Helpers/hashPassword");
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

module.exports.getUserCrimes =async (req,res,next)=>{
  const {data} = res.locals;
  try {
    // console.log({$and : [{caseNo:id},{name:data.name}]})
    const crimeData = await findAll('crimeRegister',{$and : [{name:data.name} ]})
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
    const {data} = res.locals;
    const crimeData = await findAll('crimeRegister',{$and : [{investigatingOfficer:"none"},{city:data.city}]})
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
    client.messages.create({
      from: 'whatsapp:+14155238886',
      to:'whatsapp:+917666137800',
      body: 'Update for Case Number: '+caseNo+'\n'+details
    })
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

module.exports.transferCase=async (req,res)=>{
  const {newOfficer,caseNo} = req.body;
  const isCaseUpdated = await updateOne('crimeRegister',{caseNo},{$set:{investigatingOfficer:newOfficer}});
  if(isCaseUpdated){ 
    client.messages.create({
      from: 'whatsapp:+14155238886',
      to:'whatsapp:+917666137800',
      body: 'Your case having case number: '+caseNo+' has been transfered to inspector '+newOfficer
    })
    return res.status(200).send({message:"Case transfer successfull"});}
  return res.status(500).send({error:"An error occured while trying to update case please try again"})
}

module.exports.registerPolice = async (req,res)=>{
  const {data} = res.locals;
  if(data.userType==="policeman"){ 
    const {username,password,name,city,phone} = req.body;

    const doesUsernameExist = await findOne("users", {$or:[{ username },{phone}]});

    if (doesUsernameExist ) {
      res.status(409).json({ error: `Phone number or Username already exists` });
      return;
    }

    try {
      const {salt,hash} = hashPass(password);

      const isUserAdded =await insertOne('users',{username,name,salt,hash,city,phone,userType:"policeman"});
      const token = sign({username,name,city,phone,userType:"policeman"}, 'sihpolicebotsecret');
      res.status(201).json({ message: "Success",token });
      
    } catch (error) {
      console.log(error)
      res.status(500).send({error})
    }
    return;
  }

  res.status(401).send({error:"Unauthorized access"});
}

module.exports.getPoliceMen = async (req,res)=>{
  const {data} = res.locals;
  if(data.userType==="policeman"){ 
  try {
    const police =await findAll('users',{$and : [{userType:"policeman"}]});
    res.status(200).json(police);
    } catch (error) {
      console.log(error)
      res.status(500).send({error})
    }
    return;
  }

  res.status(401).send({error:"Unauthorized access"});
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJuYW1lIjoidGVzdCIsImNpdHkiOiJtdW1iYWkiLCJ1c2VyVHlwZSI6ImNpdGl6ZW4iLCJwaG9uZSI6MjMsIl9pZCI6IjVlMzQzN2M0NmRhZDdkMmMyYTk5MDE3YiIsImlhdCI6MTU4MDQ4MDQ1Mn0.MDNRFAAhlHbdrnxSzBqdOtIYEI2e1TBoj-JPrUBuJUI