'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const RED = '#C24740';
const YELLOW = '#F3AE1A';
const GREEN = '#50C240';

const cities = ['beijing', 'shanghai', 'nanjing', 'wuhan', 'hangzhou', 'guangzhou', 'shenzhen'];

const setMarkerSymbol = (feature) => {
  feature.properties['marker-symbol'] || (feature.properties['marker-symbol'] = 'cafe');
}

const setMarkerColor = (feature, avg) => {
  if (avg < 5) {
    feature.properties['marker-color'] = RED;
  } else if (avg < 10) {
    feature.properties['marker-color'] = YELLOW;
  } else {
    feature.properties['marker-color'] = GREEN;
  }
}

const buildMarker = (city) => {
  const sourceFile = path.resolve(__dirname, `../${city}.geojson`);
  const tempFile = path.resolve(__dirname, `./tmp.${city}.json`);

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
    let average = sum / downloadSpeed.length;
    setMarkerColor(f, average);
    setMarkerSymbol(f);
  }
  fs.unlinkSync(tempFile);
  fs.writeFileSync(sourceFile, JSON.stringify(target, null, 2) + '\n');
  console.log(`${city}: Done with ${target.features.length} records!`);
}
cities.forEach(buildMarker)
