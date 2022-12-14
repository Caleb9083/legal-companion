const express = require("express");
const chapterController = require("../controllers/chapterController")
const router = express.Router();

router
    .route("/:constitutionId/chapters")
    .get(chapterController.getAllChapterForConstitution)
    .post(chapterController.createChapter);

router
    .route("/:constitutionId/chapters/:chapterId")
    .get(chapterController.getOneChapterForConstitution)
    .put(chapterController.updateChapterForConstitution)
    .delete(chapterController.deleteChapterForConstitution);

module.exports = router;
