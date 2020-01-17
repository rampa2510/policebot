//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const hashPass = require("../Helpers/hashPassword");
const { findOne, insertOne } = require("../Helpers/queryHandler");
const { sign } = require("jsonwebtoken");
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
    next();
  } catch (error) {
    res.status(500).json({ error });
    // console.log(error);
    next();
  }
};
