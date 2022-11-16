const express = require("express");

const router = express.Router();

const {
  createExco,
  getAllExco,
  updateExco,
  deleteExco,
  getSingleExco,
  uploadExcoImage,
} = require("../controllers/exco");

router.route("/").post(createExco).get(getAllExco);
router.route("/:id").delete(deleteExco).get(getSingleExco).patch(updateExco);

router.route("/uploadexco").post(uploadExcoImage);

module.exports = router;
