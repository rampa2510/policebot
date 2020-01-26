//========================================================================================
/*                                                                                      *
 *                              Import all the modules here                             *
 *                                                                                      */
//========================================================================================
const {insertOne,incrementCounter,findOne} = require('../Helpers/queryHandler');
//########################################################################################



module.exports.registerCrime =async (req,res,next)=>{
  const {data} = res.locals
  try {
    const caseNo = await incrementCounter()
    await insertOne('crimeRegister',{name:data.name,...req.body,caseNo,status:'pending',investigatingOfficer:'none',updates:[]})

    res.status(201).json({message:"Crime registered",caseNo})
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}

module.exports.getCrimeDetails =async (req,res,next)=>{
  const id = req.params.id;
  try {
    // console.log({$and : [{caseNo:id},{name:data.name}]})
    const caseData = await findOne('crimeRegister',{$and : [{caseNo:parseInt(id)}]})
    // console.log(caseData)
    res.status(200).json({caseData})
    next()
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
    next()
  }
}


