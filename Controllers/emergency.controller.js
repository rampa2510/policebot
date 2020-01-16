//========================================================================================
/*                                                                                      *
 *                             Import helper functions here                             *
 *                                                                                      */
//========================================================================================
const {insertOne} = require('../Helpers/queryHandler')
//########################################################################################

module.exports.emergencyRegister =async (req,res)=>{
  const {data} = res.locals;
  await insertOne('emergency',{...req.body,name:data.name});
  res.status(200).send({reply:""});
}