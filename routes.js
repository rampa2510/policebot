//========================================================================================
/*                                                                                      *
 *             Import dependencies and configure express router                         *
 *                                                                                      */
//========================================================================================
const express = require("express"),
  router = express.Router(),
  { celebrate,Segments } = require("celebrate");
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                            Import all the Controllers                                *
 *                                                                                      */
//========================================================================================
let controllerPath = "./Controllers";
const registrationController = require(`./Controllers/registration.controller`);
const loginController = require(`./Controllers/login.controller`);
const {registerCrime,getCrimeDetails} = require(`./Controllers/userCrimeRegistration.controller`);
const chatBotRoute = require(`./Controllers/chatbotresponse.controller.js`);
const {getMyCrimes,getAllCrimes,startInvestigation,deleteCrimeData, finishInvestigation,updateDetails} = require(`./Controllers/policemanActions.controller.js`);
const {webhookController} = require('./Controllers/webhooks.controller');
const {emergencyRegister,getEmergencyData} = require('./Controllers/emergency.controller')
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                 Import all the models                                *
 *                                                                                      */
//========================================================================================
const registrationModel = require(`./Models/regestration.model`);
const {body} = require(`./Models/login.model`);
const CrimeRegistrationModel = require(`./Models/userCrimeRegistration.model`);
const updateDetailsModel = require('./Models/updateDetails.model');
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             Configure all the routes here                            *
 *                                                                                      */
//========================================================================================

router.post("/register", celebrate(registrationModel), registrationController);
router.post("/login", celebrate({[Segments.BODY]:body}), loginController);
router.post('/crime-register',celebrate(CrimeRegistrationModel),registerCrime)
router.get('/crime-register/:id',getCrimeDetails);
router.get('/get-crime-register',getAllCrimes);
router.get('/get-my-crimes',getMyCrimes);
router.post('/bot-reply',chatBotRoute);
router.patch('/investigation',startInvestigation);
router.patch('/finishinvestigation',finishInvestigation);
router.delete('/investigation/:caseNo',deleteCrimeData);
router.post('/webhooks',webhookController);
router.post('/update-details',celebrate(updateDetailsModel),updateDetails);
router.post('/emergency',emergencyRegister);
router.get('/emergency',getEmergencyData);
//########################################################################################

module.exports = router;
