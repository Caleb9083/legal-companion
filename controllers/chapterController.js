const ConstitutionChapterModel = require("../models/chapterModel");

exports.getAllChapterForConstitution = async (req, res) => {
    const { search, page, pageSize } = req.query;
    const { constitutionId } = req.params;
    console.log(req.params);

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
}

exports.createChapter = async (req, res) => {
    const { constitutionId } = req.params;
    const newChapter = new ConstitutionChapterModel({
        constitution: constitutionId,
        ...req.body,
    });

    await newChapter.save();
    return res.json(newChapter.toJSON()).status(200);
}

exports.getOneChapterForConstitution = async (req, res) => {
    const { chapterId, constitutionId } = req.params;
    const chapter = await ConstitutionChapterModel.findOne({
        _id: chapterId,
        constitution: constitutionId,
    });
    if (!chapter) {
        return res.status(404).json({ status: "fail", message: "Chapter not found!" });
    }
    return res.json(chapter.toJSON()).status(200);
}

exports.updateChapterForConstitution = async (req, res) => {
    const { chapterId, constitutionId } = req.params;
    const chapter = await ConstitutionChapterModel.findOne({
        _id: chapterId,
        constitution: constitutionId,
    });
    if (!chapter) {
        return res.status(404).json({ status: "fail", message: "Chapter not found!" });
    }
    await chapter.updateOne({
        $set: {
            ...req.body,
        },
    });
    return res.json(chapter.toJSON()).status(200);
}

exports.deleteChapterForConstitution = async (req, res) => {
    const { chapterId, constitutionId } = req.params;
    const chapter = await ConstitutionChapterModel.findOne({
        _id: chapterId,
        constitution: constitutionId,
    });
    if (!chapter) {
        return res.status(404).json({ status: "fail", message: "Chapter not found!" });
    }
    await chapter.deleteOne();
    return res.json(chapter.toJSON()).status(200);
}