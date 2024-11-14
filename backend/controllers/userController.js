import User from "../model/user.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"


// REGISTER
const handleRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email }).lean()

    if (userExist) {
        res.status(400).json({ message: "user already exist" })
    }

    // @hashing password 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashPassword,
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })

    } else {
        res.status(400).json({ message: " Invalid user data " })
    }

    res.status(201).json({ message: "User Registered" })
})

//LOGIN
const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).lean()

    if (user && (await bcrypt.compare(password, user.password))) {
        generateToken(res, user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
        res.status(200).json({ message: "User Logined" })

    } else {
        res.status(401).json({ message: "Inavalid email or password" })
    }
})

//LOGOUT
const handleLogout = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: " Logged out successfully " })
}

//PROFILE
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).lean()

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

//PROFILE
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })

    } else {
        res.status(404).json({
            message: "User not found"
        })
    }

})

export { handleRegister, handleLogin, handleLogout, getUserProfile,updateUserProfile }