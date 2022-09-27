const { Schema, SchemaTypes, model } = require("mongoose")

const ConstitutionSchema = new Schema({
    title: {
        type: SchemaTypes.String,
        required: true
    },
    preamble: {
        type: SchemaTypes.String,
        required: true
    }
}, {
    timestamps: true
});

const ConstitutionModel = model("Constitution", ConstitutionSchema);

module.exports = ConstitutionModel
