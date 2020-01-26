const uploadToS3 = require('../Helpers/uploadToS3')
const {findOne,updateOne} = require('../Helpers/queryHandler')
const {basename,extname} =require('path')
module.exports= async (req,res)=>{
  const ext = extname(req.file.filename)
  const url = await uploadToS3(basename(req.file.filename,ext),ext)
  let textResponse;
  const data = await findOne('crimeRegister',{caseNo:parseInt(req.body.caseNo)});
  if(!data){
    textResponse=`Error`
  }else{
    await updateOne('crimeRegister',{caseNo:parseInt(req.body.caseNo)},{$set: {url}});
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
