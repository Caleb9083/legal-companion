const express = require("express");
const {
    ConstitutionModel,
    ConstitutionChapterModel,
    ConstitutionSectionModel,
} = require("../models/constitutionModel");
const router = express.Router();

router
    .route("/:constitutionId/chapters")
    // get chapters under constitution
    .get(async (req, res) => {

        const { search, page, pageSize } = req.query;
        const { constitutionId } = req.params;
        console.log(req.params)

        if (search) {
            const chapters = await ConstitutionChapterModel.find({
                constitution: constitutionId,
                $or: [
                    { title: { $regex: search, $options: "im" } },
                    { preamble: { $regex: search, $options: "im" } },
                ],
            })
                .skip(page * pageSize || 0)
                .limit(pageSize || 0)
                .lean();

            return res.json(chapters).status(200);
        }
        const chapters = await ConstitutionChapterModel.find({
            constitution: constitutionId,
        })
            .skip(page * pageSize || 0)
            .limit(pageSize || 0)
            .lean();

        return res.json(chapters).status(200);
    })
    // create chapter
    .post(async (req, res) => {
        const { constitutionId } = req.params;
        const newChapter = new ConstitutionChapterModel({
            constitution: constitutionId,
            ...req.body,
        });

        await newChapter.save();
        return res.json(newChapter.toJSON()).status(200);
    });

router
    .route("/:constitutionId/chapters/:chapterId")
    // get single chapter under constitution
    .get(async (req, res) => {
        const { chapterId, constitutionId } = req.params;
        const chapter = await ConstitutionChapterModel.findOne({
            _id: chapterId,
            constitution: constitutionId,
        });
        if (!chapter) {
            return res.status(404).statusMessage("Chapter Not Found");
        }
        return res.json(chapter.toJSON()).status(200);
    })
    // update chapter
    .put(async (req, res) => {
        const { chapterId, constitutionId } = req.params;
        const chapter = await ConstitutionChapterModel.findOne({
            _id: chapterId,
            constitution: constitutionId,
        });
        if (!chapter) {
            return res.status(404).statusMessage("Chapter Not Found");
        }
        await chapter.updateOne({
            $set: {
                ...req.body,
            },
        });
        return res.json(chapter.toJSON()).status(200);
    })
    // delete chapter
    .delete(async (req, res) => {
        const { chapterId, constitutionId } = req.params;
        const chapter = await ConstitutionChapterModel.findOne({
            _id: chapterId,
            constitution: constitutionId,
        });
        if (!chapter) {
            return res.status(404).statusMessage("Chapter Not Found");
        }
        await chapter.deleteOne();
        return res.json(chapter.toJSON()).status(200);
    });

module.exports = router;
