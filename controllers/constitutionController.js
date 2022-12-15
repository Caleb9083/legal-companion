const ConstitutionModel = require("../models/constitutionModel");
const AppError = require("../utils/appError");

exports.getAllConstitutions = async (req, res, next) => {
  const { search, page, pageSize } = req.query;

  if (search) {
    const constitutions = await ConstitutionModel.find({
      $or: [
        { title: { $regex: search, $options: "im" } },
        { preamble: { $regex: search, $options: "im" } },
      ],
    })
      .skip(page * pageSize || 0)
      .limit(pageSize || 0)
      .lean();
    return res.json(constitutions).status(200);
  }
  const constitutions = await ConstitutionModel.find({})
    .skip(page * pageSize || 0)
    .limit(pageSize || 0)
    .lean();
  return res.json(constitutions).status(200);
};

exports.getOneConstitution = async (req, res, next) => {
  const { constitutionId } = req.params;
  const constitution = await ConstitutionModel.findById(constitutionId);
  if (!constitution) {
    return res.status(404).statusMessage("Constitution Not Found");
  }
  return res.json(constitution.toJSON()).status(200);
};

exports.createConstitution = async (req, res, next) => {
  try {
    const newConstitution = new ConstitutionModel({
      ...req.body,
    });

    await newConstitution.save();
    return res.status(200).json({ status: "success", newConstitution });
  } catch {
    return next(new AppError("New document was not created, Try again!"));
  }
};

exports.updateConstitution = async (req, res, next) => {
  try {
    const { constitutionId } = req.params;
    const constitution = await ConstitutionModel.findById(constitutionId);
    if (!constitution) {
      return res.status(404).statusMessage("Constitution Not Found");
    }
    await constitution.updateOne({
      $set: {
        ...req.body,
      },
    });
    return res.status(200).json({ status: "success", constitution });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};

exports.deleteConstitution = async (req, res, next) => {
  try {
    const { constitutionId } = req.params;
    const constitution = await ConstitutionModel.findById(constitutionId);
    if (!constitution) {
      return res.status(404).statusMessage("Constitution Not Found");
    }
    await constitution.deleteOne();
    return res.status(200).json({ status: "success", constitution });
  } catch (err) {
    return next(new AppError(`${err.message}`, 400));
  }
};
