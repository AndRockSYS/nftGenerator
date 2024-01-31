const generateVariations = require('./varitationsGenerator');
const generateAll = require('./generator');

let imageWidth = 64;
let collectionAmount = 30;

async function main() {
    generateVariations(collectionAmount);
    await generateAll(imageWidth);
}

main();