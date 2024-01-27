const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "data": "Authentication API Endpoint"
    });
});

module.exports = router;
