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
    res.status(200).json({
        "message": "Login User"
    })
})



// @desc    User Login
// route    POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        "message": "Login User"
    })
})


// @desc    User Logout
// route    POST /api/v1/auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        "message": "Logout User"
    })
})


// @desc    Get User Profile
// route    GET /api/v1/auth/profile
// @access  Private   
const getProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        "message": "User Profile"
    })
})

// @desc    Update User Profile
// route    PUT /api/v1/auth/profile
// @access  Private   
const updateProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        "message": "Update User Profile"
    })
})



module.exports = { registerUser, loginUser, logoutUser, getProfile, updateProfile, authUser }
