const express = require('express');
const { generateImage } = require('../controllers/imageController');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Base64 resmi oluştur
        const base64 = await generateImage(400, 400);
        console.log(base64);

        // Base64 resmini HTML içinde görüntüle
        res.send(`<img src="${base64}" alt="Oluşturulan Resim">`);
    } catch (error) {
        console.error('Hata oluştu:', error);
        res.status(500).send('İşlem sırasında bir hata oluştu');
    }
})

router.post('/', async (req, res) => {
    const { url } = req.body;
    let base64Image = await generateImage(400, 400);
    res.json({
        "data": base64Image
    });
});



module.exports = router;
