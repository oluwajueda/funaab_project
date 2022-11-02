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

const updateTestimony = async (req, res) => {
  try {
    const { id: testimonyId } = req.params;

    const testimony = Testimony.findByIdAndUpdate(
      { _id: testimonyId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimony) {
      res.status(404).json(`No testimony with id ${testimonyId}`);
    }
    res.status(200).send({ testimony });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
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
};
