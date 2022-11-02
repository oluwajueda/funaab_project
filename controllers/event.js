const Event = require("../models/events");

const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(200).json({ event });
};

const getAllEvent = async (req, res) => {
  const events = await Event.find({});

  res.status(200).json({ events, count: events.length });
};

const getSingleEvent = async (req, res) => {
  const {
    params: { id: eventId },
  } = req;

  const event = await Event.findOne({
    _id: eventId,
  });

  if (!event) {
    res.status(404).json(`No event with id ${eventId}`);
  }
  res.status(201).json({ event });
};

const updateEvent = async (req, res) => {
  const { id: EventId } = req.params;
  const event = await Event.findByIdAndUpdate({ _id: EventId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!event) {
    res.status(404).json(`No Event with id : ${EventId}`);
  }
  res.status(201).json({ event });
};

const deleteEvent = async (req, res) => {
  const {
    params: { id: eventId },
  } = req;

  const event = await Event.findByIdAndRemove({
    _id: eventId,
  });

  if (!event) {
    res.status(404).json(`No testimony with id ${eventId}`);
  }
  res.status(201).send();
};

module.exports = {
  createEvent,
  getAllEvent,
  updateEvent,
  deleteEvent,
  getSingleEvent,
};
