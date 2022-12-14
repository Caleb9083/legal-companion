const express = require("express");
const constitutionController = require("../controllers/constitutionController")
const router = express.Router();


router
  .route("/")
  .get(constitutionController.getAllConstitutions)
  .post(constitutionController.createConstitution);

router
  .route("/:constitutionId")
  .get(constitutionController.getOneConstitution)
  .put(constitutionController.updateConstitution)
  .delete(constitutionController.deleteConstitution);

module.exports = router;
