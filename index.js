const generateVariations = require('./varitationsGenerator');
const generateAll = require('./generator');
const convertPixelImg = require('./convertPixelImages');

let imageWidth = 64;
let collectionAmount = 30;
let convertPixel = true;

function main() {
    generateVariations();
    generateAll(imageWidth);
    
    if(convertPixel)
        convertPixelImg(collectionAmount)
}

main();