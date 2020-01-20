//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const hashPass = require("../Helpers/hashPassword");
const { findOne, insertOne } = require("../Helpers/queryHandler");
const { sign } = require("jsonwebtoken");
const client = require('twilio')("ACd68a6040106a2b0d3ebc3d2143f1a5ba","8efb9f0856c00bd17eced4b801f2c887");
//########################################################################################

module.exports = async (req, res, next) => {
  const { username, password, name, city,userType,phone } = req.body;

  try {
    const doesUsernameExist = await findOne("users", { username });

    if (doesUsernameExist) {
      res.status(409).json({ error: "Username already exists" });
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

    const token = sign(userData, 'sihpolicebotsecret');

    res.status(201).json({ message: "Sucess", token });
    const otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const mobile = phone.toString()
    client.messages.create({
      from: 'whatsapp:+14155238886',
      to:'whatsapp:+91'+mobile,
      body: 'Your otp code is '+otp
    })
    next();
  } catch (error) {
    res.status(500).json({ error });
    // console.log(error);
    next();
  }
};
