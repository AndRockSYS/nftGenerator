const fs = require('fs');
const scalePixelArt = require("scale-pixel-art");

let amount = 30;

function convert() {
    for(let i = 1; i <= amount; i++) {
    const inputBuffer = fs.readFileSync(`./generated/${i}.png`);
    scalePixelArt(inputBuffer, 10).then((data) => {
      fs.writeFileSync(`./generated/${i}.png`, data);
    });
  }
}

convert();