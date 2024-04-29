const Jimp = require('jimp');
const path = require('path');

async function createImage() {

    try {

        // Görseli yükleyin (lokal dosyadan veya URL üzerinden)
        const imageUrl = path.join(__dirname, "..", "..", 'public', 'images', 'back.jpg');
        const image = await Jimp.read(imageUrl);

        image.resize(1500, 600);

        const canvas = await new Jimp(1500, 600, 'white');

        await canvas.composite(image, 0, 0,
            {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            });


        const buffer = await imageToBuffer(canvas);
        return buffer;
    } catch (error) {
        console.error('Hata oluştu:', error);
        throw new Error(error);
    }


}

async function imageToBuffer(image) {
    return new Promise((resolve, reject) => {
        image.getBuffer(Jimp.MIME_PNG, (error, buffer) => {
            if (error) {
                reject(error);
            } else {
                resolve(buffer);
            }
        });
    });
}

module.exports = { createImage };