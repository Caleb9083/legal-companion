const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/sectionController");
const authController = require("../controllers/authController");

router
    .route("/:constitutionId/chapters/:chapterId/sections")
    .get(sectionController.getAllSectionForChapter)
    .post(authController.protect, sectionController.createSectionForChapter);

router
    .route("/:constitutionId/chapters/:chapterId/sections/:sectionId")
    .get(sectionController.getOneSectionOfChapter)
    .put(authController.protect, sectionController.updateSectionForChapter)
    .delete(authController.protect, sectionController.deleteSectionOfChapter);

module.exports = router;
