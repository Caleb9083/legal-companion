const { Schema, SchemaTypes, model } = require("mongoose");

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
    },
    {
        timestamps: true,
    }
);

const ConstitutionChapterModel = model(
    "ConstitutionChapter",
    ConstitutionChapterSchema
);

module.exports = ConstitutionChapterModel;
