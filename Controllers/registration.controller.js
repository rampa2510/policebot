//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const hashPass = require("../Helpers/hashPassword");
const { findOne, insertOne,generateOtp,deleteOne } = require("../Helpers/queryHandler");
const { sign } = require("jsonwebtoken");
const client = require('twilio')("api key","pass");
//########################################################################################

module.exports.genrateOtp = async (req, res, next) => {
  const { username, phone } = req.body;

  try {
    const doesUsernameExist = await findOne("users", {$or:[{ username },{phone}]});
    // const doesPhoneExist = await findOne("users", { phone });
    if (doesUsernameExist ) {
      res.status(409).json({ error: `Phone number or Username already exists` });
      return;
    }

    const otp = await generateOtp(username);
    const mobile = phone.toString()
    client.messages.create({
      from: 'whatsapp:+14155238886',
      to:'whatsapp:+91'+mobile,
      body: 'Your OTP for Policebot is '+otp
    });
    res.status(201).json({ message: "Success" });

    next();
  } catch (error) {
    res.status(500).json({ error });
    // console.log(error);
    next();
  }
};

module.exports.verifyOtp=async (req,res)=>{
  var {otp,username,password,name,city,userType,phone} = req.body;
  city=city.toUpperCase()
  const isOtpVerified = await findOne('otps',{$and:[{otp},{username}]});

  if(isOtpVerified){
    deleteOne('otps',{$and:[{otp},{username}]});

    const {salt,hash} = hashPass(password);

    const userData = await insertOne("users", {
      hash,
      username,
      name,
      city,
      salt,
      userType,
      phone,
      strikes:0,
      lastStrikeAt:null
    });
    console.log(userData)
    delete userData.hash;
    delete userData.salt;
    delete userData.strikes;
    delete userData.lastStrikeAt;
    console.log(userData)

    const token = sign(userData, 'sihpolicebotsecret');
    res.status(201).json({ message: "Success",token });

  }else{
    res.status(500).json({ error:"Invalid OTP" });

  }
}