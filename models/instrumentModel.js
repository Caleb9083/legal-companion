const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
  },
  preamble: {
    type: String,
  },
  chapters: [Object]
});

const Instrument = mongoose.model("Instrument", instrumentSchema);

// const testInstrument = new Instrument({
//   id: '36',
//   name: 'constitution of banku',
//   preamble: "Some dummy preamble2",
//   chapters: {
//     happy: "yest",
//     sad: 'notueu'
//   }
// });

// testInstrument
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => console.log("Save Error: ", err.message));
module.exports = Instrument;

