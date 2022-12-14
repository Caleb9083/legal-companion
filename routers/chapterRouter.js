const express = require("express");
const chapterController = require("../controllers/chapterController");
const authController = require("../controllers/authController");

const router = express.Router();

router
    .route("/:constitutionId/chapters")
    .get(chapterController.getAllChapterForConstitution)
    .post(
        authController.protect,
        authController.restrictTo("admin"),
        chapterController.createChapter
    );

router
    .route("/:constitutionId/chapters/:chapterId")
    .get(chapterController.getOneChapterForConstitution)
    .put(
        authController.protect,
        authController.restrictTo("admin"),
        chapterController.updateChapterForConstitution
    )
    .delete(
        authController.protect,
        authController.restrictTo("admin"),
        chapterController.deleteChapterForConstitution
    );

module.exports = router;
