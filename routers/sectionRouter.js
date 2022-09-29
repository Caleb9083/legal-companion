const express = require("express");
const {
    ConstitutionModel,
    ConstitutionChapterModel,
    ConstitutionSectionModel,
} = require("../models/constitutionModel");
const router = express.Router();

router
    .route("/")
    .get(async (req, res) => {
        const { search, page, pageSize } = req.query;
        const { constitutionId, chapterId } = req.params;

        if (search) {
            const sections = await ConstitutionSectionModel.find({
                constitution: constitutionId,
                chapter: chapterId,
                $or: [
                    { title: { $regex: search, $options: "im" } },
                    { preamble: { $regex: search, $options: "im" } },
                ],
            })
                .skip(page * pageSize || 0)
                .limit(pageSize || 0)
                .lean();
            return res.json(sections).status(200);
        }
        const sections = await ConstitutionSectionModel.find({
            constitution: constitutionId,
            chapter: chapterId,
        })
            .skip(page * pageSize || 0)
            .limit(pageSize || 0)
            .lean();
        return res.json(sections).status(200);
    })

    // create section
    .post(async (req, res) => {
        const { constitutionId, chapterId } = req.params;
        const newSection = new ConstitutionSectionModel({
            constitution: constitutionId,
            chapter: chapterId,
            ...req.body,
        });

        await newSection.save();
        return res.json(newSection.toJSON()).status(200);
    });

router
    .route("/:sectionId")
    // get single section under constitution
    .get(async (req, res) => {
        const { sectionId, constitutionId, chapterId } = req.params;
        const section = await ConstitutionSectionModel.findOne({
            _id: sectionId,
            constitution: constitutionId,
            chapter: chapterId,
        });
        if (!section) {
            return res.status(404).statusMessage("Section Not Found");
        }
        return res.json(section.toJSON()).status(200);
    })
    // update section
    .put(async (req, res) => {
        const { sectionId, constitutionId, chapterId } = req.params;
        const section = await ConstitutionSectionModel.findOne({
            _id: sectionId,
            constitution: constitutionId,
            chapter: chapterId,
        });
        if (!section) {
            return res.status(404).statusMessage("Section Not Found");
        }
        await section.updateOne({
            $set: {
                ...req.body,
            },
        });
        return res.json(section.toJSON()).status(200);
    })
    // delete section
    .delete(async (req, res) => {
        const { sectionId, constitutionId, chapterId } = req.params;
        const section = await ConstitutionSectionModel.findOne({
            _id: sectionId,
            constitution: constitutionId,
            chapter: chapterId,
        });
        if (!section) {
            return res.status(404).statusMessage("Section Not Found");
        }
        await section.deleteOne();
        return res.json(section.toJSON()).status(200);
    });
module.exports = router;
