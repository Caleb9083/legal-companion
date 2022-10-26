const UserModel = require("../models/userModel");
const userRouter = require("../routers/userRouter");

const signup = async (req, res) => {
    try {
        const newUser = await UserModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: null
        })
    }

}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.find({ email: email, password: password })
        res.status(201).json({
            status: 'success',
            data: {
                user: user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: null
        })
    }

}

module.exports = {
    signup, signin
}