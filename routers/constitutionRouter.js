const Router = require("express").Router;
const {ConstitutionModel,ConstitutionChapterModel, ConstitutionSectionModel} = require("../models/constitutionModel")
const router = Router();

router.use("/constitutions")
  // get constitutions
  .get("/", async (req, res) => {
    const { search, page, pageSize } = req.query;

    if (search) {
      const constitutions = await ConstitutionModel
        .find({
          $or: [
            { title: { $regex: search, $options: "im" } },
            { preamble: { $regex: search, $options: "im" } },
          ]
        })
        .skip((page * pageSize) || 0)
        .limit(pageSize || 0)
        .lean();
      return res.json(constitutions).status(200);
    }
    const constitutions = await ConstitutionModel
      .find({})
      .skip((page * pageSize) || 0)
      .limit(pageSize || 0)
      .lean();
    return res.json(constitutions).status(200);
  })
  // get single constitution
  .get("/:constitutionId", async (req, res) => {
    const { constitutionId } = req.params
    const constitution = await ConstitutionModel.findById(constitutionId);
    if(!constitution) {
      return res.status(404).statusMessage("Constitution Not Found")
    }
    return  res.json(constitution.toJSON()).status(200)
  })
  // create constitution
  .post("/", async (req, res) => {
    const newConstitution = new ConstitutionModel({
      ...req.body
    })

    await newConstitution.save()
  return  res.json(newConstitution.toJSON()).status(200)
  })
  // update constitution
  .put("/:constitutionId", async (req, res) => {
    const { constitutionId } = req.params
    const constitution = await ConstitutionModel.findById(constitutionId);
    if(!constitution) {
      return res.status(404).statusMessage("Constitution Not Found")
    }
    await constitution.updateOne({
      $set: {
        ...req.body
      }
    })
    return  res.json(constitution.toJSON()).status(200)
  })
  // delete constitution
  .delete("/:constitutionId", async (req, res) => {
    const { constitutionId } = req.params
    const constitution = await ConstitutionModel.findById(constitutionId);
    if(!constitution) {
      return res.status(404).statusMessage("Constitution Not Found")
    }
    await constitution.deleteOne()
    return  res.json(constitution.toJSON()).status(200)
  })

router.use("/constitutions/:constitutionId/chapters")
  // get chapters under constitution
  .get("/", async (req, res) => {
    const { search, page, pageSize, isAmmendment } = req.query;
    const { constitutionId } = req.params;

    if (search) {
      const chapters = await ConstitutionChapterModel
        .find({
          constitution: constitutionId,
          $or: [
            { title: { $regex: search, $options: "im" } },
            { preamble: { $regex: search, $options: "im" } },
          ],
          ...(_.isBoolean(isAmmendment) ? {isAmmendment} : {}),
        })
        .skip((page * pageSize) || 0)
        .limit(pageSize || 0)
        .lean();
      return res.json(chapters).status(200);
    }
    const chapters = await ConstitutionChapterModel
      .find({
        constitution: constitutionId, 
        ...(_.isBoolean(isAmmendment) ? {isAmmendment} : {})
      })
      .skip((page * pageSize) || 0)
      .limit(pageSize || 0)
      .lean();
    return res.json(chapters).status(200);
  })
  // get single chapter under constitution
  .get("/:chapterId", async (req, res) => {
    const { chapterId , constitutionId} = req.params
    const chapter = await ConstitutionChapterModel.findOne({
      _id: chapterId,
      constitution: constitutionId
    });
    if(!chapter) {
      return res.status(404).statusMessage("Chapter Not Found")
    }
    return  res.json(chapter.toJSON()).status(200)
  })
  // create chapter
  .post("/", async (req, res) => {
    const { constitutionId } = req.params
    const newChapter = new ConstitutionChapterModel({
      constitution: constitutionId,
      ...req.body
    })

    await newChapter.save()
  return  res.json(newChapter.toJSON()).status(200)
  })
  // update chapter
  .put("/:chapterId", async (req, res) => {
    const { chapterId, constitutionId } = req.params
    const chapter = await ConstitutionChapterModel.findOne({
      _id: chapterId,
      constitution: constitutionId
    });
    if(!chapter) {
      return res.status(404).statusMessage("Chapter Not Found")
    }
    await chapter.updateOne({
      $set: {
        ...req.body
      }
    })
    return  res.json(chapter.toJSON()).status(200)
  })
  // delete chapter
  .delete("/:chapterId", async (req, res) => {
    const { chapterId, constitutionId } = req.params
    const chapter = await ConstitutionChapterModel.findOne({
      _id: chapterId,
      constitution: constitutionId
    });
    if(!chapter) {
      return res.status(404).statusMessage("Chapter Not Found")
    }
    await chapter.deleteOne()
    return  res.json(chapter.toJSON()).status(200)
  })

router.use("/constitutions/:constitutionId/chapters/:chapterId/sections")
  // get sections under constitution
  .get("/", async (req, res) => {
    const { search, page, pageSize } = req.query;
    const { constitutionId, chapterId } = req.params;

    if (search) {
      const sections = await ConstitutionSectionModel
        .find({
          constitution: constitutionId, 
          chapter: chapterId,
          $or: [
            { title: { $regex: search, $options: "im" } },
            { preamble: { $regex: search, $options: "im" } },
          ]
        })
        .skip((page * pageSize) || 0)
        .limit(pageSize || 0)
        .lean();
      return res.json(sections).status(200);
    }
    const sections = await ConstitutionSectionModel
      .find({constitution: constitutionId,  chapter: chapterId})
      .skip((page * pageSize) || 0)
      .limit(pageSize || 0)
      .lean();
    return res.json(sections).status(200);
  })
  // get single section under constitution
  .get("/:sectionId", async (req, res) => {
    const { sectionId , constitutionId, chapterId} = req.params
    const section = await ConstitutionSectionModel.findOne({
      _id: sectionId,
      constitution: constitutionId,
      chapter: chapterId
    });
    if(!section) {
      return res.status(404).statusMessage("Section Not Found")
    }
    return  res.json(section.toJSON()).status(200)
  })
  // create section
  .post("/", async (req, res) => {
    const { constitutionId, chapterId } = req.params
    const newSection = new ConstitutionSectionModel({
      constitution: constitutionId,
      chapter: chapterId,
      ...req.body
    })

    await newSection.save()
  return  res.json(newSection.toJSON()).status(200)
  })
  // update section
  .put("/:sectionId", async (req, res) => {
    const { sectionId, constitutionId, chapterId } = req.params
    const section = await ConstitutionSectionModel.findOne({
      _id: sectionId,
      constitution: constitutionId,
      chapter: chapterId,
    });
    if(!section) {
      return res.status(404).statusMessage("Section Not Found")
    }
    await section.updateOne({
      $set: {
        ...req.body
      }
    })
    return  res.json(section.toJSON()).status(200)
  })
  // delete section
  .delete("/:sectionId", async (req, res) => {
    const { sectionId, constitutionId, chapterId } = req.params
    const section = await ConstitutionSectionModel.findOne({
      _id: sectionId,
      constitution: constitutionId,
      chapter: chapterId
    });
    if(!section) {
      return res.status(404).statusMessage("Section Not Found")
    }
    await section.deleteOne()
    return  res.json(section.toJSON()).status(200)
  })
