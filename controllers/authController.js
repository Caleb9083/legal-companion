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
        console.log(req.body)
        const user = await UserModel.find({ email: email, password: password })
        if (user.length == 1) {

            res.status(200).json({
                status: 'success',
                data: {
                    user: user
                }
            })
        } else {
            res.status(200).json({
                status: "fail",
                message: "User doesn't exit"
            })
        }
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