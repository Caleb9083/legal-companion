const { Schema, SchemaTypes, model } = require("mongoose");

// Constition Schema
const ConstitutionSchema = new Schema(
    {
        title: {
            type: SchemaTypes.String,
            required: true,
        },
        preamble: {
            type: SchemaTypes.String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ConstitutionModel = model("Constitution", ConstitutionSchema);

// Constition Chapter Schema
const ConstitutionChapterSchema = new Schema(
    {
        constitution: {
            type: SchemaTypes.ObjectId,
            ref: "Constitution",
            required: true,
        },
        title: {
            type: SchemaTypes.String, // Article I
            required: true,
        },
        description: {
            type: SchemaTypes.String, // The legislative branch
            required: true,
        },
        isAmmendment: {
            type: SchemaTypes.Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const ConstitutionChapterModel = model(
    "ConstitutionChapter",
    ConstitutionChapterSchema
);

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

module.exports = {
    ConstitutionModel,
    ConstitutionChapterModel,
    ConstitutionSectionModel,
};
