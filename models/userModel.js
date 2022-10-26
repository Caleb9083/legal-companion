const { Schema, SchemaTypes, model } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: [true, "Enter your name"],
    },
    email: {
        type: SchemaTypes.String,
        required: [true, "Enter your email"],
    },
    password: {
        type: SchemaTypes.String,
        required: [true, "Enter your password"],
    },
    confirmPassword: {
        type: SchemaTypes.String,
        required: [true, "Re-enter your password"],
    },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
