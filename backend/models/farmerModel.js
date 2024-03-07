const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  fullName: String,
  govtId: String,
  phoneNumber: String,
  email: String,
  address: String,
  state: String,
  pincode: String,
  bankName: String,
  bankAccountNumber: String,
  password: String
});

Farmer=mongoose.model('farmer', farmerSchema);

module.exports = Farmer
