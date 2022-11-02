const mongoose = require("mongoose");

const testimonySchema = new mongoose.Schema(
  {
    testimony: {
      type: String,
      required: [true, "Please enter your testimony"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimony", testimonySchema);
