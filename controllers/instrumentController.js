const Instrument = require("../models/instrumentModel");

const getAllInstrument = async (req, res, next) => {
  try {
    console.log(req.query);
    let query = Instrument.find();

    const instruments = await query;

    //SEND QUERY
    res.status(200).json({
      status: "sucess",
      results: instruments.length,
      data: {
        instruments,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

const getOneInstrument = async (req, res, next) => {
  try {
    const tour = await Instrument.findById(req.params.id);
    // Instrument.findOne({_id: req.params.id})
    res.status(200).json({
      status: "sucess",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

const createInstrument = async (req, res, next) => {
  try {
    // const newInstrument = new Instrument({})
    // newInstrument.save()
    const newInstrument = await Instrument.create(req.body);
    res.status(201).json({
      status: "sucess",
      data: {
        instrument: newInstrument,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

const updateInstrument = async (req, res, next) => {
  try {
    const tour = await Instrument.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Invalid data sent!",
    });
  }
};

const deleteInstrument = async (req, res, next) => {
  try {
    await Instrument.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

module.exports = {
  getAllInstrument,
  getOneInstrument,
  createInstrument,
  updateInstrument,
  deleteInstrument,
};
