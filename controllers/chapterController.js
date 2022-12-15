const ConstitutionChapterModel = require("../models/chapterModel");
const AppError = require("../utils/appError");

exports.getAllChapterForConstitution = async (req, res, next) => {
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
};

exports.createChapter = async (req, res, next) => {
  try {
    const { constitutionId } = req.params;
    const newChapter = new ConstitutionChapterModel({
      constitution: constitutionId,
      ...req.body,
    });

    await newChapter.save();
    return res.status(200).json({ status: "success", newChapter });
  } catch (err) {
    return new AppError("Chapter was not created, Try again!", 400);
  }
};

exports.getOneChapterForConstitution = async (req, res, next) => {
  const { chapterId, constitutionId } = req.params;
  const chapter = await ConstitutionChapterModel.findOne({
    _id: chapterId,
    constitution: constitutionId,
  });
  if (!chapter) {
    return next(AppError("Chapter not found!", 400));
  }
  return res.status(200).json({ chapter });
};

exports.updateChapterForConstitution = async (req, res, next) => {
  try {
    const { chapterId, constitutionId } = req.params;
    const chapter = await ConstitutionChapterModel.findOne({
      _id: chapterId,
      constitution: constitutionId,
    });
    if (!chapter) {
      return next(AppError("Chapter not found!", 400));
    }
    await chapter.updateOne({
      $set: {
        ...req.body,
      },
    });
    return res.status(200).json({ status: "success", chapter });
  } catch (err) {
    return next(new AppError("Chapter could not be updated, Try again!", 400));
  }
};

exports.deleteChapterForConstitution = async (req, res, next) => {
  try {
    const { chapterId, constitutionId } = req.params;
    const chapter = await ConstitutionChapterModel.findOne({
      _id: chapterId,
      constitution: constitutionId,
    });
    if (!chapter) {
      return next(AppError("Chapter not found!", 400));
    }
    await chapter.deleteOne();
    return res.status(200).json({ status: "success", chapter });
  } catch (err) {
    return next(new AppError("Chapter not deleted, Try again1", 400));
  }
};
