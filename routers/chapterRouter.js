const express = require("express");
const ConstitutionChapterModel = require("../models/constitutionModel");
const chapterController = require("../controllers/chapterController")
const router = express.Router();

router
    .route("/:constitutionId/chapters")
    // get chapters under constitution
    .get(chapterController.getAllChapterForConstitution)
    // create chapter
    .post(chapterController.createChapter);

router
    .route("/:constitutionId/chapters/:chapterId")
    // get single chapter under constitution
    .get(chapterController.getOneChapterForConstitution)
    // update chapter
    .put(chapterController.updateChapterForConstitution)
    // delete chapter
    .delete(chapterController.deleteChapterForConstitution);

module.exports = router;
