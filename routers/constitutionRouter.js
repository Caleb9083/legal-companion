const express = require("express");
const constitutionController = require("../controllers/constitutionController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(constitutionController.getAllConstitutions)
  .post(authController.protect, constitutionController.createConstitution);

router
  .route("/:constitutionId")
  .get(constitutionController.getOneConstitution)
  .put(authController.protect, constitutionController.updateConstitution)
  .delete(authController.protect, constitutionController.deleteConstitution);

module.exports = router;
