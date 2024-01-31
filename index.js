const generateVariations = require('./varitationsGenerator');
const generateAll = require('./generator');
const convertPixelImg = require('./convertPixelImages');

let imageWidth = 64;
let collectionAmount = 30;
let convertPixel = true;

async function main() {
    generateVariations(collectionAmount);
    await generateAll(imageWidth);

    if(convertPixel)
        convertPixelImg(collectionAmount)
}

main();