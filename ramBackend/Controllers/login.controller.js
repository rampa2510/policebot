//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const hashPass = require("../Helpers/hashPassword");
const { findOne } = require("../Helpers/queryHandler");
const {sign} = require('jsonwebtoken')
//########################################################################################

module.exports = async (req, res, next) => {
  try {

    const { password, username } = req.body;

    let response = await findOne("users", { username });

    if(!response){
      res.status(400).json({ error: "Invalid details" });
      return;
    }

    const hashedPass = hashPass(password, response.salt);
    // console.log(hash,hashedPass)

    if (hashedPass.hash === response.hash) {
      delete response.salt;
      delete response.hash

      const token = sign(response, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
      });
  
      res.status(200).json({data:response,token});
    } else {
      res.status(400).json({ error: "Invalid details" });
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};
