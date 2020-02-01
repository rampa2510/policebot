//========================================================================================
/*                                                                                      *
 *             Import dependencies and configure express router                         *
 *                                                                                      */
//========================================================================================
const express = require("express"),
  router = express.Router(),
  { celebrate,Segments } = require("celebrate");
const multer = require('multer') 
const {extname} = require('path')
//########################################################################################

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null,  `${Date.now()}${extname(file.originalname)}`)
  }
})
const upload = multer({storage})
//========================================================================================
/*                                                                                      *
 *                            Import all the Controllers                                *
 *                                                                                      */
//========================================================================================
const {genrateOtp,verifyOtp} = require(`./Controllers/registration.controller`);
const loginController = require(`./Controllers/login.controller`);
const {registerCrime,getCrimeDetails} = require(`./Controllers/userCrimeRegistration.controller`);
const chatBotRoute = require(`./Controllers/chatbotresponse.controller.js`);
const {getMyCrimes,getUserCrimes,getAllCrimes
  ,startInvestigation,deleteCrimeData, 
  finishInvestigation,updateDetails,
  transferCase,
  registerPolice, getPoliceMen} = require(`./Controllers/policemanActions.controller.js`);
const {webhookController} = require('./Controllers/webhooks.controller');
const {emergencyRegister, deleteEmergency, getEmergency} = require('./Controllers/emergency.controller');
const uploadFile = require('./Controllers/upload.controller')
const {reportSpam} = require('./Controllers/spam.controller');
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
const verifyOtpModel = require('./Models/verifyOtp.model');
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                             Configure all the routes here                            *
 *                                                                                      */
//========================================================================================

router.post("/register", celebrate(registrationModel), genrateOtp);
router.post("/verify",celebrate(verifyOtpModel), verifyOtp);
router.post("/login", celebrate({[Segments.BODY]:body}), loginController);
router.post('/crime-register',celebrate(CrimeRegistrationModel),registerCrime)
router.get('/crime-register/:id',getCrimeDetails);
router.patch("/crime-register",transferCase)
router.get('/get-crime-register',getAllCrimes);
router.get('/get-my-crimes',getMyCrimes);
router.get('/get-user-crimes',getUserCrimes);
router.get('/getpolicemen',getPoliceMen);
router.post('/bot-reply',chatBotRoute);
router.patch('/investigation',startInvestigation);
router.patch('/finishinvestigation',finishInvestigation);
router.delete('/investigation/:caseNo',deleteCrimeData);
router.post('/webhooks',webhookController);
router.post('/update-details',celebrate(updateDetailsModel),updateDetails);
router.post('/emergency',emergencyRegister);
router.delete('/deleteemergency/:emergencyNo',deleteEmergency);
router.get('/getemergency', getEmergency);
router.post('/image-upload',upload.single('image'),uploadFile);
router.post('/spam',reportSpam);
router.post('/register-police',registerPolice);
//########################################################################################

module.exports = router;
