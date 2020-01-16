//========================================================================================
/*                                                                                      *
 *                             Import helper functions here                             *
 *                                                                                      */
//========================================================================================
const {insertOne,findAll} = require('../Helpers/queryHandler')
//########################################################################################

module.exports.emergencyRegister =async (req,res)=>{
  const {data} = res.locals;
  await insertOne('emergency',{...req.body,name:data.name});
  res.status(200).send({reply:""});
}

module.exports.getEmergencyData=async (req,res)=>{
  try {
    const emeData = await findAll('emergency',{});
    res.status(200).send(emeData)
  } catch (error) {
    res.status(500).send({error:"We are experincing issues"})
  }
  
}