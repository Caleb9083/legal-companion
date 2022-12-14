const express = require("express");
const router = express.Router();
const sectionController = require("../controllers/sectionController")

router
    .route("/:constitutionId/chapters/:chapterId/sections")
    .get(sectionController.getAllSectionForChapter)
    .post(sectionController.createSectionForChapter);

router
    .route("/:constitutionId/chapters/:chapterId/sections/:sectionId")
    .get(sectionController.getOneSectionOfChapter)
    .put(sectionController.updateSectionForChapter)
    .delete(sectionController.deleteSectionOfChapter);

module.exports = router;
