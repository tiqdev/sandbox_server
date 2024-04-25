const { createCanvas } = require('canvas');

const generateImage = (width, height) => {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // Draw your image on the canvas using the context API

    // Example: Drawing a red rectangle
    context.fillStyle = 'red';
    context.fillRect(0, 0, width, height);


    context.fillStyle = '#000000';
    context.font = '20px Arial';
    context.fillText('Merhaba, Dünya!', 50, 100);


    // Convert the canvas image to base64 format
    const base64Image = canvas.toDataURL('image/jpg');

    return base64Image;
}

module.exports = { generateImage };