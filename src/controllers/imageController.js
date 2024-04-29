const Jimp = require('jimp');

async function createImage() {

    try {
        // Özel fontu yükle (Jimp'te CSS bağlantısını kullanarak)
        const customFont = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

        // Görseli yükleyin (lokal dosyadan veya URL üzerinden)
        const imageUrl = './public/images/back.jpg'; // veya bir URL
        const image = await Jimp.read(imageUrl);

        image.resize(1500, 600);

        const canvas = await new Jimp(1500, 600, 'white');

        await canvas.composite(image, 0, 0,
            {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacityDest: 1,
                opacitySource: 1
            });

        await canvas.print(
            customFont, // Kullanılacak özel font
            50, // X konumu
            50, // Y konumu
            "Merhaba, Dünya!" // Metin
        );


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