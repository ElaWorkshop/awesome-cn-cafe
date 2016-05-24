'use strict';

const path = require('path');
const fs = require('fs');
const jsonlint = require("jsonlint");

const lint = (city) => {
  const sourceFile = path.resolve(__dirname, '..', city);
  const json = fs.readFileSync(sourceFile, 'utf8');
  try {
    return !!jsonlint.parse(json);
  } catch (e) {
    //emebed the file name into error.message
    e.message = `${city}: ${e.message}`
    throw e;
  }
};
const cities = fs.readdirSync(path.resolve(__dirname, '..')).filter(fileName => {
  return path.extname(fileName) === '.geojson';
});
cities.every(lint);


