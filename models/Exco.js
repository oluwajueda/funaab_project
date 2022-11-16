const { number } = require("joi");
const mongoose = require("mongoose");

const ExcoSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "/excoUpload/exco-avatar.png",
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Exco", ExcoSchema);
