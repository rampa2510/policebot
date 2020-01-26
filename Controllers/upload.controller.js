const uploadToS3 = require('../Helpers/uploadToS3')
const {basename,extname} =require('path')
module.exports= async (req,res)=>{
  const ext = extname(req.file.filename)
  const url = uploadToS3(basename(req.file.filename,ext),ext)
  // console.log(req.file);
  res.status(200).send({url})
}