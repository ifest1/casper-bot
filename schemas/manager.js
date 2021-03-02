const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  }
});

const Manager = mongoose.model("Managers", ManagerSchema);
module.exports = Manager;