//========================================================================================
/*                                                                                      *
 *                            Import all the helper functions                           *
 *                                                                                      */
//========================================================================================
const {updateOne, deleteOne} = require('../Helpers/queryHandler')
//########################################################################################

module.exports.reportSpam = async (req,res)=>{
  const {data} = res.locals;
  const {name} = req.body
  const {caseNo} = req.body
  if(data.userType==="policeman"){
    const isStrikeAdded = await updateOne('users',{name},{$set:{lastStrikeAt:Date.now()},$inc:{strikes:1}});
    const isCaseDeleted = await deleteOne('crimeRegister',{caseNo});
    res.status(200).send({Message:"Spam reported"});
    return;
  }
  res.status(401).send({error:"Unauthorised"})
}