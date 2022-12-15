const ConstitutionSectionModel = require("../models/sectionModel");
const AppError = require("../utils/appError");

exports.getAllSectionForChapter = async (req, res) => {
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
};

exports.createSectionForChapter = async (req, res, next) => {
  try {
    const { constitutionId, chapterId } = req.params;
    const newSection = new ConstitutionSectionModel({
      constitution: constitutionId,
      chapter: chapterId,
      ...req.body,
    });

    await newSection.save();
    return res.status(200).json({ status: "success", newSection });
  } catch (err) {
    return next(new AppError("Section was not created", 400));
  }
};

exports.getOneSectionOfChapter = async (req, res, next) => {
  const { sectionId, constitutionId, chapterId } = req.params;
  const section = await ConstitutionSectionModel.findOne({
    _id: sectionId,
    constitution: constitutionId,
    chapter: chapterId,
  });
  if (!section) {
    return res.status(404).statusMessage("Section Not Found");
  }
  return res.status(200).json({ status: "success", section });
};

exports.updateSectionForChapter = async (req, res, next) => {
  try {
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
    return res.status(200).json({ status: "success", section });
  } catch (err) {
    return next(new AppError(`${err.message}`));
  }
};

exports.deleteSectionOfChapter = async (req, res, next) => {
  try {
    const { sectionId, constitutionId, chapterId } = req.params;
    const section = await ConstitutionSectionModel.findOne({
      _id: sectionId,
      constitution: constitutionId,
      chapter: chapterId,
    });
    if (!section) {
      return next(AppError("Section Not Found", 400));
    }
    await section.deleteOne();
    return res.status(200).json({ status: "success", section });
  } catch (err) {
    return next(new AppError(`${err.message}`));
  }
};
