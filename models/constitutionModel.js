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

module.exports = ConstitutionModel;
