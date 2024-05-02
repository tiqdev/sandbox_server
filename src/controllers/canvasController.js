
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas')
const path = require('path');
const drawMultilineText = require('canvas-multiline-text');
const { drawText } = require('canvas-txt');

const createAya = async (_text) => {
    console.log('Gelen metin:', _text);
    const text = _text === "" ? "İnfitar 6.Ayet: Ey insan, 'üstün kerem sahibi' olan Rabbine karşı seni aldatıp yanıltan nedir?" : _text;
    // Font path
    const font_path = path.join(__dirname, '..', '..', 'public', 'fonts', 'Baskerville.ttf');
    const lora_path = path.join(__dirname, '..', '..', 'public', 'fonts', 'LoraSemiBold.ttf');
    const inter_path = path.join(__dirname, '..', '..', 'public', 'fonts', 'Inter-Bold.ttf');

    // Background image path
    const background_path = path.join(__dirname, '..', '..', 'public', 'images', 'back.jpg');

    // Flower image path
    const flower_path = path.join(__dirname, '..', '..', 'public', 'images', 's.webp');

    // Register font
    GlobalFonts.registerFromPath(font_path, 'Baskerville')
    GlobalFonts.registerFromPath(lora_path, 'LoraSemiBold')
    GlobalFonts.registerFromPath(inter_path, 'InterBold')

    // Main canvas
    const width = 1080;
    const height = 1080;
    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d');

    // Define label rectangles
    const label_canvas = createCanvas(400, 80)
    const label_context = label_canvas.getContext('2d')

    // Overlay canvas
    const overlay_canvas = createCanvas(width, height)
    const overlay_context = overlay_canvas.getContext('2d')

    // Draw overlay
    overlay_context.fillStyle = 'rgba(41, 41, 41, 0.6)'
    overlay_context.fillRect(0, 0, width, height)


    // Load and draw background image
    const background = await loadImage(background_path);
    context.drawImage(background, 0, 0, width, height);

    // Draw flower image
    const flower = await loadImage(flower_path);
    context.drawImage(flower, 60, 800, 262, 400);

    // Draw overlay canvas
    context.drawImage(overlay_canvas, 0, 0)

    // Draw text on the canvas we use both canvas-txt and canvas-multiline-text because canvas-multiline-text does not support vertical alignment
    // Create transparent text to get the font size
    context.fillStyle = 'transparent';
    const fontSize = drawMultilineText(
        canvas.getContext('2d'),
        text,
        {
            rect: {
                x: 60,
                y: 200,
                width: canvas.width - 200,
                height: canvas.height - 440
            },
            font: 'LoraSemiBold',
            verbose: true,
            lineHeight: 1.2,
            minFontSize: 16,
            maxFontSize: 60,
        }
    )

    // Define text properties
    context.fillStyle = 'white';
    drawText(context, text, {
        x: 64,
        y: 220,
        width: canvas.width - 200,
        height: canvas.height - 440,
        fontSize: fontSize,
        lineHeight: fontSize * 1.17,
        font: 'LoraSemiBold',
        align: "left",
        vAlign: "center",
    })

    // Draw Label
    // Create linear gradient for label
    const grad = context.createLinearGradient(0, 0, 380, 0);
    grad.addColorStop(0, "#292929");
    grad.addColorStop(1, "transparent");

    // Draw label
    label_context.fillStyle = grad;
    label_context.fillRect(0, 0, 400, 80)

    // Draw label on the main canvas and draw text
    context.drawImage(label_canvas, 60, 60)
    context.fillStyle = '#fff';
    context.font = '48px LoraSemiBold';
    context.fillText('Günün Ayeti', 72, 130)

    return canvas.toBuffer("image/jpeg");
}

module.exports = { createAya };