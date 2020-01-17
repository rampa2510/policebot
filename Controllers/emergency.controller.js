//========================================================================================
/*                                                                                      *
 *                             Import helper functions here                             *
 *                                                                                      */
//========================================================================================
const {findAll, insertOne, deleteOne} = require('../Helpers/queryHandler')
//########################################################################################

module.exports.emergencyRegister =async (req,res)=>{
  const {data} = res.locals;
  await insertOne('emergency',{...req.body,name:data.name});
  res.status(200).send({reply:""});
}

module.exports.deleteEmergency=async (req,res)=>{
  const emergencyNo = req.params.emergencyNo;
  try {
    const isEmergencyDeleted = await deleteOne('emergency',{"_id":require('mongodb').ObjectID(emergencyNo)});
    if(isEmergencyDeleted){ 
      return res.status(200).send({message:"Emergency deleted!"});
    }
    else return res.status(404).send({error:"Emergency cannot be found"})
  } catch (error) {
    console.log(error);
    res.status(500).send({error})
  }
}

module.exports.getEmergency =async (req,res,next)=>{
  try {
    // console.log({$and : [{caseNo:id},{name:data.name}]})
    const emergencyData = await findAll('emergency',{})
    // console.log(crimeData)
    res.status(200).json({emergencyData})
    next()
  } catch (error) {
    // console.log(error)
    res.status(500).json({error})
    next()
  }
}