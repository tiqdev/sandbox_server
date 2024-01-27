const asyncHandler = require("express-async-handler")

// @desc    Register a new user
// route    POST /api/v1/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        "message": "Register User"
    })
});


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

module.exports = { registerUser, loginUser, logoutUser }
