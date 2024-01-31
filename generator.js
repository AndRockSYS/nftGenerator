const fs = require("fs");
const mergeImg = require('merge-img');

const config = require('./config');
const attributes = require('./attributes');

async function generateImagesAndMetadata(width) {
  const props = JSON.parse(fs.readFileSync(`${config.outputFolder}/layersVariations.json`));
  for (let i = 0; i < props.length; i++) {
    await generateImages(props[i], i+1, width);
    if(config.uri)
      generateMetadata(i+1, props[i]);
  }
}

async function generateImages(variations, tokenId, width) {
  let layers = [];

  for (let i = 0; i < variations.length; i++) {
    if (variations[i] == 0) continue;

    layers.push({
      src: `${config.layersFolder}/${attributes[i].name} (${variations[i]}).png`,
      offsetX: (i == 0) ? 0 : -width,
      offsetY: 0,
    });
  }

  let image = await mergeImg(layers);
  image.write(`${config.outputFolder}/${tokenId}.png`);
}

function generateMetadata(tokenId, variations) {
  let metadata = {
    description: config.description, 
    image: config.uri + tokenId + ".png", 
    name: `${config.name} ${tokenId}#`,
    attributes: []
  };

  for (let i = 0; i < variations.length; i++) {
    if (variations[i] == 0) continue;

    metadata.attributes.push({
      trait_type: attributes[i].name,
      value: attributes[i].attrNames[variations[i] - 1]
    });
  }

  fs.writeFileSync(`${config.metadataFolder}/${tokenId}.json`, JSON.stringify(metadata));
}

module.exports = generateImagesAndMetadata