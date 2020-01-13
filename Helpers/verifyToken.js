//========================================================================================
/*                                                                                      *
 *                              Import all the dependencies                             *
 *                                                                                      */
//========================================================================================
const { verify } = require("jsonwebtoken");
//########################################################################################


/**
 * @description - This function will be used to verify the token sent 
 *                from the request to verify whether user is authenticated or not
 * 
 * @param authHeader {Request Header} this is the authorozation header which has the jwt token
 * 
 * @returns         user data if jwt is verified else retuns error name
 * 
 * @author          Ram pandey
 */
module.exports = authHeader => {
  const token = authHeader.split(" ")[1];

  try {
    const decodedData = verify(token,'sihpolicebotsecret');

    return decodedData;
  } catch (error) {
    return error.name
  }
};
