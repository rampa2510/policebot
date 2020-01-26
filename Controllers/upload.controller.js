const uploadToS3 = require('../Helpers/uploadToS3')
const {basename,extname} =require('path')
module.exports= async (req,res)=>{
  console.log(req.file)
  const ext = extname(req.file.filename)
  const url = await uploadToS3(basename(req.file.filename,ext),ext)
  // console.log(url);
  res.status(200).send({url})
}