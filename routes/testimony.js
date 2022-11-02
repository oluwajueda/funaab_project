const express = require("express");
const authenticateUser = require("../middleware/authentication");

const router = express.Router();

const {
  createTestimony,
  deleteTestimony,
  getAllTestimony,
} = require("../controllers/testimony");

router.route("/").post(authenticateUser, createTestimony).get(getAllTestimony);

router.route("/:id").get(deleteTestimony);

module.exports = router;
