const Jimp = require('jimp');

async function createImage() {
    const image = await new Jimp(400, 200, 'red');
    const buffer = await imageToBuffer(image);
    return buffer;
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