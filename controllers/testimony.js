const Testimony = require("../models/testimony");

const createTestimony = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const testimony = await Testimony.create(req.body);
  console.log(req.body);
  res.status(200).json({ testimony });
};

const getAllTestimony = async (req, res) => {
  const testimonies = await Testimony.find({});

  res.status(200).json({ testimonies, count: testimonies.length });
};

const getSingleTestimony = async (req, res) => {
  const {
    params: { id: testimonyId },
  } = req;

  const testimony = await Testimony.findOne({
    _id: testimonyId,
  });

  if (!testimony) {
    res.status(404).json(`No event with id ${testimonyId}`);
  }
  res.status(201).json({ testimony });
};

const updateTestimony = async (req, res) => {
  const { id: testimonyId } = req.params;

  const testimony = await Testimony.findOneAndUpdate(
    { _id: testimonyId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!testimony) {
    res.status(404).json(`No testimony with id ${testimonyId}`);
  }
  res.status(200).send({ testimony });
};

const deleteTestimony = async (req, res) => {
  const {
    params: { id: testimonyId },
  } = req;

  const testimony = await Testimony.findByIdAndRemove({
    _id: testimonyId,
  });

  if (!testimony) {
    res.status(404).json(`No testimony with id ${testimonyId}`);
  }
  res.status(201).send();
};

module.exports = {
  createTestimony,
  deleteTestimony,
  getAllTestimony,
  updateTestimony,
  getSingleTestimony,
};
