
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getProfile, updateProfile } = require('../controllers/authController');

router.get('/', (req, res) => {
    res.json({
        "data": "Authentication API Endpoint"
    });
});


//Register User
router.post('/register', registerUser)

//User Login
router.post('/login', loginUser)

//User Logout
router.post('/logout', logoutUser)

//User Profile
router.route('/profile').get(getProfile).put(updateProfile)



//-----> POST /api/v1/auth/login - Authenticate a user and get a token
//-----> POST /api/v1/auth/logout - Logout user and clear cookie
//-----> POST /api/v1/auth/register - Register a new user

module.exports = router;
