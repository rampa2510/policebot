//========================================================================================
/*                                                                                      *
 *                            Import all the helper functions                           *
 *                                                                                      */
//========================================================================================
const {findAll,updateOne,deleteOne} = require('../Helpers/queryHandler')
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
    const isInvestigationOngoing = await findOne('crimeRegister',{caseNo,status:"ongoing"})
    if(isInvestigationOngoing) return res.status(409).send({message:"the case is already ongoing"})
    const isCaseDataUpdated = await updateOne('crimeRegister',{caseNo},{$set:{investigatingOfficer:data.name,status:"ongoing"}})
    console.log(isCaseDataUpdated)

    if(isCaseDataUpdated) return res.status(200).send({message:"Case data updated successfully"});
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
    console.log(isCaseDataUpdated)

    if(isCaseDataUpdated) return res.status(200).send({message:"Case data updated successfully"});
    else return res.status(404).send({error:"Couldn't update case data"});
    
  } catch (error) {
    // console.log(error);
    res.status(500).send({error})
  }
}

module.exports.deleteCrimeData=async (req,res)=>{
  const caseNo = parseInt(req.params.caseNo);
  try {
    const isCaseDeleted = await deleteOne('crimeRegister',{caseNo});
    if(isCaseDeleted) return res.status(200).send({message:"Case deleted!"});
    else return res.status(404).send({error:"Case cannot be found"})
  } catch (error) {
    console.log(error);
    res.status(500).send({error})
  }
}