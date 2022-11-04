const express = require("express");

const router = express.Router();

const {
  createEvent,
  getAllEvent,
  updateEvent,
  deleteEvent,
  getSingleEvent,
  uploadImage,
} = require("../controllers/event");

router.route("/").post(createEvent).get(getAllEvent);

router.route("/:id").delete(deleteEvent).patch(updateEvent).get(getSingleEvent);

router.route("/upload").post(uploadImage);

module.exports = router;
