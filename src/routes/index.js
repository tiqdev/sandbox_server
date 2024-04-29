const express = require('express');
const router = express.Router();

//For metadata application
const metadata = require('./metadataRoutes.js');

//For authentication samples
const authentication = require("./authRoutes.js");

//For image generation
const image = require("./imageRoutes.js");


router.get('/', (req, res) => {
    res.json({
        message: 'API - 👋🌎🌍🌏',
    });
});



router.use('/metadata', metadata);
router.use("/auth", authentication);
router.use("/image", image);
module.exports = router;
