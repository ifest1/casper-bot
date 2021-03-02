const request = require('request')
const { createCard } = require('../templates/generic');

// categorias de notícias que serão disponibilizadas via webhook
const newsType = ['Política', 'Entretenimento', 'Famosos', 'Esportes'];

// manda o payload pro chat
function callSendAPI(sender_psid, response) {
    // build payload
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
    
    // faz a requisição passando o page_access_token
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!: ' + sender_psid)
      } else {
        console.error("Unable to send message:" + err);
      }
    });
}

// teste
async function handleNewsRequest(sender_psid, received_message) {
    // testes
    let card1 = createCard('Card1', 'Subtitle1', 'https://i.picsum.photos/id/775/200/300.jpg?hmac=nko360AK314QqqXl8HbvoKqB5EoQuRQHGQ1pDRmSn0c', 'www.google.com');
    let card2 = createCard('Card2', 'Subtitle2', 'https://i.picsum.photos/id/775/200/300.jpg?hmac=nko360AK314QqqXl8HbvoKqB5EoQuRQHGQ1pDRmSn0c', 'www.google.com');
    let card3 = createCard('Card3', 'Subtitle3', 'https://i.picsum.photos/id/775/200/300.jpg?hmac=nko360AK314QqqXl8HbvoKqB5EoQuRQHGQ1pDRmSn0c', 'www.google.com');
    let response = {
      "attachment":{
          "type":"template",
          "payload": {
            "template_type":"generic",
            "elements":[card1, card2, card3]
          }
      }
    }
    callSendAPI(sender_psid, response);    
  }

// webhook que faz conexão direta com o facebook messenger
function webhookController(req, res) {
  let body = req.body;
  
  if (body.object === 'page') {
    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      
      if(newsType.includes(webhook_event.message.text)) {
        handleNewsRequest(sender_psid, webhook_event.message);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
}

module.exports = webhookController;