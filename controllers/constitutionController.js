const ConstitutionModel = require("../models/constitutionModel")


exports.getAllConstitutions = async (req, res) => {
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
}

exports.getOneConstitution = async (req, res) => {
    const { constitutionId } = req.params;
    const constitution = await ConstitutionModel.findById(constitutionId);
    if (!constitution) {
        return res.status(404).statusMessage("Constitution Not Found");
    }
    return res.json(constitution.toJSON()).status(200);
}

exports.createConstitution = async (req, res) => {
    const newConstitution = new ConstitutionModel({
        ...req.body,
    });

    await newConstitution.save();
    return res.json(newConstitution.toJSON()).status(200);
}

exports.updateConstitution = async (req, res) => {
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
    return res.json(constitution.toJSON()).status(200);
}

exports.deleteConstitution = async (req, res) => {
    const { constitutionId } = req.params;
    const constitution = await ConstitutionModel.findById(constitutionId);
    if (!constitution) {
        return res.status(404).statusMessage("Constitution Not Found");
    }
    await constitution.deleteOne();
    return res.json(constitution.toJSON()).status(200);
}