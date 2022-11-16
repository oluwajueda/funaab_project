const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
   
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
