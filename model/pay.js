const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const paySchema = mongoose.Schema({
  fullName: { type: String, required: true, unique: true },
  userId: { type: String, unique: true, sparse: true },
  driver: { type: String, unique: true },
  cost: { type: String, required: true },
  distance: { type: String }
});

paySchema.plugin(uniqueValidator);
module.exports = mongoose.model("Pay", paySchema);
