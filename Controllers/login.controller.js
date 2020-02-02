//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const hashPass = require("../Helpers/hashPassword");
const { findOne,updateOne } = require("../Helpers/queryHandler");
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
  
    if(response.userType==="citizen"){
      if(response.strikes>=3){
        let lastStrike = new Date(response.lastStrikeAt);
        lastStrike = lastStrike/1000
        let now = new Date();
        now = now/1000
        let diffInHrs = (now - lastStrike)/3600; 
        // console.log(diffInHrs)
        // 120 hrs = 5 days
        if(diffInHrs>120){
          const updateUsers = await updateOne('users',{username:response.username},{$set:{strikes:0,lastStrikeAt:null}});

        }else{
          res.status(401).send({error:"You have been reported spam and your account has been suspended for 5 days"});
          return;
        }
      }

    }

    const hashedPass = hashPass(password, response.salt);
    // console.log(hash,hashedPass)

    if (hashedPass.hash === response.hash) {
      delete response.salt;
      delete response.hash;
      delete response.lastStrikeAt;
      delete response.strikes;

      const token = sign(response,"sihpolicebotsecret");
  
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
