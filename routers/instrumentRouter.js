const express = require("express");
const instrumentController = require("../controllers/instrumentController");
const router = express.Router();

// router
//   .route("/top-5-cheap")
//   .get(instrumentController.aliasTopTours, instrumentController.getAllTours);

//router.route("/tour-stats").get(instrumentController.getTourStats);

router
  .route("/")
  .get(instrumentController.getAllInstrument)
  .post(instrumentController.createInstrument);

router
  .route("/:id")
  .get(instrumentController.getOneInstrument)
  .patch(instrumentController.updateInstrument)
  .delete(instrumentController.deleteInstrument);

module.exports = router;
