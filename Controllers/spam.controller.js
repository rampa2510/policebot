//========================================================================================
/*                                                                                      *
 *                            Import all the helper functions                           *
 *                                                                                      */
//========================================================================================
const {updateOne} = require('../Helpers/queryHandler')
//########################################################################################

module.exports.reportSpam = async (req,res)=>{
  const {data} = res.locals;
  const {username} = req.body
  if(data.userType==="policeman"){
    const isStrikeAdded = await updateOne('users',{username},{$set:{lastStrikeAt:Date.now()},$inc:{strikes:1}});
    res.status(200).send({Message:"Spam reported"});
    return;
  }
  res.status(401).send({error:"Unauthorised"})
}