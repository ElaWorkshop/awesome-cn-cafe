'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const RED = '#C24740';
const YELLOW = '#F3AE1A';
const GREEN = '#50C240';

const city = process.argv[2];
if (!city || !city.match(/(shanghai|beijing|nanjing)/)) {
  console.log(`Missing City! Usage:
    node addColor.js <city>[shanghai|beijing|nanjing]`);
  process.exit(1);
}
const sourceFile = path.resolve(__dirname, `../${city}.geojson`);
const tempFile = path.resolve(__dirname, './tmp.json');

//copy geojson to json file because node.js only requires(load) json file.
fs.writeFileSync(tempFile, fs.readFileSync(sourceFile));

let target = require(tempFile);

for (let f of target.features) {
  let downloadSpeed = f.properties['下载速度'];
  //some downloadSpeed may be array, in such case let's caculate the average
  if (!Array.isArray(downloadSpeed)) {
    downloadSpeed = [ downloadSpeed ];
  }
  let sum = downloadSpeed.map(value => {
    const matched = value.match(/^([\d|\.]+)\s?Mbps$/i);
    let speedStr = matched && matched[1];
    assert(speedStr);
    return parseFloat(speedStr);
  }).reduce((a, b) => { return a + b });
  let avg = sum / downloadSpeed.length;
  if (avg < 5) {
    f.properties['marker-color'] = RED;
  } else if (avg < 10) {
    f.properties['marker-color'] = YELLOW;
  } else {
    f.properties['marker-color'] = GREEN;
  }
}
fs.unlinkSync(tempFile);
fs.writeFileSync(sourceFile, JSON.stringify(target, null, 2));
console.log(`Done with ${target.features.length} records!`);
