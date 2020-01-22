//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const hashPass = require("../Helpers/hashPassword");
const { findOne, insertOne,generateOtp } = require("../Helpers/queryHandler");
const { sign } = require("jsonwebtoken");
const client = require('twilio')("ACd68a6040106a2b0d3ebc3d2143f1a5ba","8efb9f0856c00bd17eced4b801f2c887");
//########################################################################################

module.exports.registrationController = async (req, res, next) => {
  const { username, password, name, city,userType,phone } = req.body;

  try {
    const doesUsernameExist = await findOne("users", { username });
    const doesPhoneExist = await findOne("users", { phone });
    if (doesUsernameExist || doesPhoneExist) {
      res.status(409).json({ error: `${doesPhoneExist?"Phone number":"Username"} already exists` });
      return;
    }
    const {salt,hash} = hashPass(password);

    const userData = await insertOne("users", {
      hash,
      username,
      name,
      city,
      salt,
      userType,
      phone
    });

    delete userData.hash;
    delete userData.salt;

    // const token = sign(userData, 'sihpolicebotsecret');

    const otp = generateOtp(username)
    const mobile = phone.toString()
    client.messages.create({
      from: 'whatsapp:+14155238886',
      to:'whatsapp:+91'+mobile,
      body: 'Your otp code is '+otp
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
  const {otp,username} = req.body;
  const isOtpVerified = await findOne('otps',{$and:[{otp},{username}]});

}