const mongoose = require("mongoose");

const wholesalerSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  email: String,
  address: String,
  state: String,
  pincode: String,
  password: String
});

const Wholesaler = mongoose.model("wholesaler", wholesalerSchema);

module.exports = Wholesaler;