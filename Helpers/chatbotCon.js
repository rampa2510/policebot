const dialogflow = require('dialogflow');
const uuid = require('uuid');
const sessionId = uuid.v4()
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
module.exports = async function (message,projectId = 'newagent-bocquu',id=sessionId) {
  // console.log(id)
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"./Helpers/NewAgent-97039e124a80.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, id);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: message,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  // console.log('Detected intent');
  const result = responses[0].queryResult;
  // console.log(result.parameters)
  // console.log(`  Query: ${result.queryText}`);
  // console.log(`  Response: ${result.fulfillmentText}`);
  // if (result.intent) {
    // console.log(`  Intent: ${result.intent.displayName}`);
  // } else {
  //   console.log(`  No intent matched.`);
  // }

  return result;
}

