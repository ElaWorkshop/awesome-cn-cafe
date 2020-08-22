#!/usr/bin/env node

'use strict';

const assert = require('assert');
const fs = require('fs');
const { cities, getCityGeoJSON } = require('./utils');
const updater = require('./lint');

const RED = '#C24740';
const YELLOW = '#F3AE1A';
const GREEN = '#50C240';
const GRAY = '#BEBEBE';

const setMarkerSymbol = (feature) => {
  if (!feature.properties['marker-symbol'])
    feature.properties['marker-symbol'] = 'cafe';
};

const setMarkerColor = (feature, avg, status) => {
  if (status === '停业') {
    feature.properties['marker-color'] = GRAY;
  } else if (avg < 4) {
    feature.properties['marker-color'] = RED;
  } else if (avg < 10) {
    feature.properties['marker-color'] = YELLOW;
  } else {
    feature.properties['marker-color'] = GREEN;
  }
};

const buildMarker = (city) => {
  const sourceFile = getCityGeoJSON(city);

  const target = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

  for (let f of target.features) {
    let downloadSpeed = f.properties['下载速度'];
    //some downloadSpeed may be array, in such case let's calculate the average
    if (!Array.isArray(downloadSpeed)) {
      downloadSpeed = [downloadSpeed];
    }
    let sum = downloadSpeed
      .map((value) => {
        const matched = value.match(/^([\d|\.]+)\s?Mbps$/i);
        let speedStr = matched && matched[1];
        assert(speedStr);
        return parseFloat(speedStr);
      })
      .reduce((a, b) => {
        return a + b;
      });
    let average = sum / downloadSpeed.length;
    let status = f.properties['营业状态'];
    setMarkerColor(f, average, status);
    setMarkerSymbol(f);
  }
  fs.writeFileSync(sourceFile, JSON.stringify(target, null, 2) + '\n');
  console.log(`${city}: Done with ${target.features.length} records!`);
};

cities.forEach(buildMarker);
updater.updateCafeNumbers();
