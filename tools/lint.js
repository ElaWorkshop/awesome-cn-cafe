'use strict';

const path = require('path');
const fs = require('fs');
const jsonlint = require("jsonlint");

const readme = path.resolve(__dirname, '..', 'README.md');
const content = fs.readFileSync(readme, 'utf8');

const lint = (city) => {
  const sourceFile = path.resolve(__dirname, '..', city);
  const json = fs.readFileSync(sourceFile, 'utf8');
  try {
    const cafes = jsonlint.parse(json);
    if (!isCounterMatched(city, cafes.features.length)) {
      throw Error('Need to update the counter in README.md');
    }
    return true;
  } catch (e) {
    //emebed the file name into error.message
    e.message = `${city}: ${e.message}`
    throw e;
  }
};

const cities = fs.readdirSync(path.resolve(__dirname, '..')).filter(fileName => {
  return path.extname(fileName) === '.geojson';
});

const isCounterMatched = (city, currentCafes) => {
  //match the number before the cityname e.g. [北京 (35)](beijing.geojson)
  const arr = content.match(`\\((\\d+)\\)\\]\\(${city}`);
  if (!arr) return false;
  return parseInt(arr[1], 10) === currentCafes;
};

cities.every(lint);


