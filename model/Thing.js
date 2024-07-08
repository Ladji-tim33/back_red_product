// Thing.js
const mongoose = require("mongoose");

const thingSchema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: Number, required: true },
  price: { type: Number, required: true },
  devise: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Thing", thingSchema);
