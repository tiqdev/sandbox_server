const express = require('express');
const { createAya } = require("../controllers/canvasController");
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "data": "Welcome to image generation api!"
    });
})


router.get('/createAya', async (req, res) => {

    const { text } = req.query;
    let _text = text;
    if (!text) {
        _text = "";
    }
    console.log('Gelen metin:', _text);

    try {
        const imageBuffer = await createAya(_text);
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
