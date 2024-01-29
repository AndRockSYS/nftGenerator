const fs = require("fs");

const config = require('./config');
const attributes = require('./attributes');

function variationToProps(variation) {
  let props = [];
  attributes.forEach((attr, index) => {
    let property = parseInt(variation % attr.count);
    property += property < 0 ? 1 : 0;
    props[index] = attr.required ? property + 1 : property;

    let temp = (variation - props[index]) / attr.count;
    variation = temp > 0 ? Math.round(temp) : temp == -0.5 ? -1 : 0;
  });
  return props;
}

function generateNFTs(collectionAmount) {
  let combinations = 1;

  attributes.forEach((trait) => {
    combinations *= trait.required ? trait.count : (trait.count + 1);
  });
  console.log(`Possible combinations: ${combinations}`);

  let variations = [];
  while (variations.length < collectionAmount) {
    let variation = parseInt(Math.random() * combinations);

    if (!variations.includes(variation))
      variations.push(variation);
  }

  let props = [];
  variations.forEach((variation) => {
    props.push(variationToProps(variation));
  });

  fs.writeFileSync(`${config.outputFolder}/layersVariations.json`, JSON.stringify(props));
}

function generateVariations(collectionAmount) {
  generateNFTs(collectionAmount);
}

module.exports = generateVariations