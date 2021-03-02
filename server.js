const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const getJWTToken = require('./auth/authenticate');
const verifyJWTToken = require('./middlewares/authorization');
//const verificationController = require('./controllers/verificationController');
//const webhookController = require('./controllers/webhookController');
const dialogController = require('./controllers/dialogController');
const newsController = require('./controllers/newsController');

const app = express();


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());

// verificação do webhook 
//app.get('/webhook', verificationController);

// endpoint do webhook
//app.post("/webhook", webhookController);
app.post("/webhook", dialogController);



// endpoints do painel administrativo
app.post('/api/login', getJWTToken);

app.use(verifyJWTToken);

// rotas somente para autenticados (admins) CRUD notícias
app.post('/api/news/', newsController.store);
app.get('/api/news/', newsController.index);
app.delete('/api/news/:id', newsController.remove);
app.patch('/api/news/:id', newsController.update);

app.listen(process.env.PORT);