const express = require('express');
const { createImage } = require("../controllers/imageController");
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "data": "Welcome to image generation api!"
    });
})


router.get('/create', async (req, res) => {

    try {
        const imageBuffer = await createImage();
        console.log('Resim oluşturuldu', imageBuffer);
        // Resmi yanıt olarak gönder
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
    } catch (error) {
        console.error('Hata oluştu:', error);
        res.status(500).send('Bir hata oluştu');
    }
}
);




module.exports = router;
