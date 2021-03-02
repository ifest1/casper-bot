const VERIFY_TOKEN = process.env.VERIFY_TOKEN

function verificationController(req, res) {  
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  
   if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook log: SUBSCRIBED');
      res.status(200).send(challenge);
    
    } else {
      res.sendStatus(403);      
    }
  }
}

module.exports = verificationController;