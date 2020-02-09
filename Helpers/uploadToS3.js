const aws = require('aws-sdk');
const sharp = require('sharp')
const {unlinkSync,readFileSync} = require('fs')
const {join} = require('path')
const s3 = new aws.S3({
  secretAccessKey:'your secret access key', // Not working key, Your SECRET ACCESS KEY from AWS should go here, never share it!!!
  accessKeyId:'your access key', // Not working key, Your ACCESS KEY ID from AWS should go here, never share it!!!
  region: '', // region of your bucket
})

const uploadToS3 = (fileName,ext)=>{
  return new Promise((resolve,reject)=>{
      // console.log(fileName)
  sharp(join(__dirname,`../uploads/${fileName}${ext}`))
  .resize(220,200)
  .webp()
  .toFile(`${fileName}.webp`,(err)=>{
    if(err) {
      console.log(err)
      reject(err)
    }
      const fileContent = readFileSync(`${fileName}.webp`);
      const params = {
        Bucket: 'pbots',
        Key: `${fileName}.webp`, // File name you want to save as in S3
        Body: fileContent
    };

    s3.upload(params, function(err, data) {
      if (err) {
          reject(err);
      }
      unlinkSync(`${fileName}.webp`)
    
      unlinkSync(join(__dirname,`../uploads/${fileName}${ext}`))
      // console.log(`File uploaded successfully. ${data.Location}`);
      resolve(data.Location);
    });
    
  })


  })
}

module.exports = uploadToS3