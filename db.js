const mongoose = require('mongoose');

const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

const uri = `mongodb+srv://casper-db:${password}@cluster0.ijhgp.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = {
  mongoose: mongoose
}
