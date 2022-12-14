const { Schema, SchemaTypes, model } = require("mongoose");

// Constitional Section Schema
const ConstitutionSectionSchema = new Schema({
    constitution: {
        type: SchemaTypes.ObjectId,
        ref: "Constitution",
        required: true,
    },
    chapter: {
        type: SchemaTypes.ObjectId,
        ref: "ConstitutionChapter",
        required: true,
    },
    title: {
        type: SchemaTypes.String,
        required: true,
    },
    content: {
        type: SchemaTypes.String,
        required: true,
    },
});

const ConstitutionSectionModel = model(
    "ConstitutionSection",
    ConstitutionSectionSchema
);

model.exports = ConstitutionSectionModel;
