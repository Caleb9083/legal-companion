const express = require("express");
const chapterController = require("../controllers/chapterController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/:constitutionId/chapters")
    .get(chapterController.getAllChapterForConstitution)
    .post(authController.protect, chapterController.createChapter);

router
    .route("/:constitutionId/chapters/:chapterId")
    .get(chapterController.getOneChapterForConstitution)
    .put(authController.protect, chapterController.updateChapterForConstitution)
    .delete(
        authController.protect,
        chapterController.deleteChapterForConstitution
    );

module.exports = router;
