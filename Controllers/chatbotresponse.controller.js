//========================================================================================
/*                                                                                      *
 *                                Import all dependencies                               *
 *                                                                                      */
//========================================================================================
const BotReply = require('../Helpers/chatbotCon');
const {insertOne,incrementCounter} = require('../Helpers/queryHandler')
const client = require('twilio')("ACd68a6040106a2b0d3ebc3d2143f1a5ba","8efb9f0856c00bd17eced4b801f2c887");
//########################################################################################

module.exports = async (req,res)=>{
  const Result = await BotReply(req.body.MSG);

  // get all the values here if the intent is the end intent
  if(Result.intent.displayName==="policebot.confirm.yes" || Result.intent.displayName==="policebot.start.genric - yes" || Result.intent.displayName==="policebot.start.genric - no"){
    
    // in the locals we have the jwt data decode with all the details
    const {data} = res.locals

    const date = Result.parameters.fields.date.stringValue;
    const crime =  Result.parameters.fields.CrimeType.stringValue;
    const personObj = Result.parameters.fields.person.listValue.values || [];
    const details = Result.parameters.fields.details.stringValue || '';
    let personArr = []
    // console.log(Result.parameters.fields.details)
    personObj.forEach(personData=>{
      personArr.push(personData.structValue.fields.name.stringValue)
    })

    try {
      // get the case number from the mongodb database
      const caseNo =  await incrementCounter();
      // console.log(data.city,details,personArr)
      await insertOne('crimeRegister',{name:data.name,date,crime,personArr,details,city:data.city,caseNo,status:'pending',investigatingOfficer:'none'})
      {
        client.messages.create({
          from: 'whatsapp:+14155238886',
          to:'whatsapp:+917666137800',
          body: 'Your Report has been Registered\nCase Number: '+caseNo+'\nCrime: '+crime+'\nDescription: '+details
        })
        res.status(201).send({reply:"Crime registered case No - "+caseNo})
      }
    } catch (error) {
      console.log(error);
      res.status(200).send({reply:"I have expereinced an error sorry"})
    }

  }else if(Result.intent.displayName==="policebot.confirm.yes"){
    
  }else res.status(200).send({reply:Result.fulfillmentText})
}