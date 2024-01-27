const express = require('express');
const router = express.Router();

//For bookmark application
const bookmark = require('./bookmark');

//For authentication samples
const authentication = require("./auth_sample");


router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});



router.use('/bookmark', bookmark);
router.use("/auth", authentication);
module.exports = router;
