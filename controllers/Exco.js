const Exco = require("../models/Exco");

const path = require("path");

const createExco = async (req, res) => {
  const exco = await Exco.create(req.body);

  res.status(200).json({ exco });
};

const getAllExco = async (req, res) => {
  const excos = await Exco.find({});

  res.status(200).json({ excos, count: excos.length });
};

const getSingleExco = async (req, res) => {
  const {
    params: { id: excoId },
  } = req;
  const exco = await Exco.findOne({
    _id: excoId,
  });

  if (!exco) {
    res.status(401).json(`No exco with id ${excoId}`);
  }
  res.status(201).json({ exco });
};

const updateExco = async (req, res) => {
  const { id: excoId } = req.params;

  const exco = await Exco.findOneAndUpdate({ _id: excoId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!exco) {
    res.status(401).json(`No exco with id ${excoId}`);
  }

  res.status(201).json({ exco });
};

const deleteExco = async (req, res) => {
  const {
    params: { id: excoId },
  } = req;

  const exco = await Exco.findOneAndRemove({
    _id: excoId,
  });

  if (!exco) {
    res.status(401).json(`No exco with id ${excoId}`);
  }

  await exco.remove();

  res.status(201).json({ msg: "Success! Exco removed." });
};

const uploadExcoImage = async (req, res) => {
  if (!req.files) {
    res.status(404).json(`No File Uploaded`);
  }
  const excoImage = req.files.image;

  if (!excoImage.mimetype.startsWith("image")) {
    res.status(404).json("Please upload image");
  }

  const imagePath = path.join(
    __dirname,
    "../public/excoUpload/" + `${excoImage.name}`
  );

  await excoImage.mv(imagePath);
  res.status(201).json({ image: `/excoUpload/${excoImage.name}` });
};

module.exports = {
  createExco,
  getAllExco,
  updateExco,
  deleteExco,
  getSingleExco,
  uploadExcoImage,
};
