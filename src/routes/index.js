const express = require('express');
const router = express.Router();

//For bookmark application
const bookmark = require('./bookmarkRoutes.js');

//For authentication samples
const authentication = require("./authRoutes.js");


router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});



router.use('/bookmark', bookmark);
router.use("/auth", authentication);
module.exports = router;
