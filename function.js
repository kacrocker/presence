/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */

const request = require('request');

exports.helloWorld = (req, res) => {
  // Example input: {"message": "Hello!"}
  if (req.body.message === undefined) {
    // This is an error case, as "message" is required.
    res.status(400).send('No message defined!');
  } else {
    // Everything is okay.
    console.log(req.body.message);
    
    /* Original attempt to use POST - Fail
    POST https://hooks.slack.com/services/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
    Content-type: application/json
    {
      "text": req.body.message
    }
    */
    
    request.get('https://hooks.slack.com/services/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', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred 
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
      console.log('body:', body); //Prints the response of the request. 
    });
    
    res.status(200).send('Success: ' + req.body.message + ' with a side of Slack');
  }
};