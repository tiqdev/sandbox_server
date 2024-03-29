const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const generateToken = require("../utils/generateToken")

// @desc    Register a new user
// route    POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //if this user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    //if not create a new user
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
});


// @desc    Auth user set token
// route    POST /api/v1/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }

    res.status(200).json({
        "message": "Login User"
    })
})


// @desc    User Logout
// route    POST /api/v1/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        "message": "User Logged Out"
    })
})


// @desc    Get User Profile
// route    GET /api/v1/auth/profile
// @access  Private   
const getProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user)
})


// @desc    Update User Profile
// route    PUT /api/v1/auth/profile
// @access  Private   
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        })

    } else {
        res.status(404);
        throw new Error("User not found")
    }
})



module.exports = { registerUser, logoutUser, getProfile, updateProfile, authUser }
