const express = require("express");
const { authenticateUser } = require("../middleware/authentication");

const router = express.Router();

const {
  createTestimony,
  deleteTestimony,
  getAllTestimony,
  updateTestimony,
  getSingleTestimony,
} = require("../controllers/testimony");

router.route("/").post(authenticateUser, createTestimony).get(getAllTestimony);
router
  .route("/:id")
  .delete(deleteTestimony)
  .get(getSingleTestimony)
  .patch(updateTestimony);

module.exports = router;
