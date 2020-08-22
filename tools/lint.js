'use strict';

const path = require('path');
const fs = require('fs');
const jsonlint = require('jsonlint');
const chalk = require('chalk');
const { cities, ROOT_DIR, getCityGeoJSON } = require('./utils');

const readme = path.resolve(ROOT_DIR, 'README.md');
let readmeContent = fs.readFileSync(readme, 'utf8');

const lint = (city) => {
  const sourceFile = getCityGeoJSON(city)
  const json = fs.readFileSync(sourceFile, 'utf8');
  try {
    const cafes = jsonlint.parse(json);
    if (!isCounterMatched(city, cafes.features.length)) {
      throw Error('Need to update the counter in README.md');
    }
    return true;
  } catch (e) {
    // embed the file name into error.message
    e.message = `${city}: ${e.message}`;
    throw e;
  }
};

const update = (city) => {
  const sourceFile = getCityGeoJSON(city)
  const json = fs.readFileSync(sourceFile, 'utf8');
  const cafes = jsonlint.parse(json);
  if (!isCounterMatched(city, cafes.features.length)) {
    console.log(
      chalk.red('Found inconsistent number: city = %s, newNum = %d'),
      city,
      cafes.features.length
    );
    updateReadmeContent(city, cafes.features.length);
  }
};

const updateReadmeContent = (city, newNumber) => {
  const re = new RegExp(`(.*)\\((\\d+)\\)\\]\\((${city})`);
  readmeContent = readmeContent.replace(re, `$1(${newNumber})]($3`);
};

const isCounterMatched = (city, currentCafes) => {
  // match the number before the cityname e.g. [北京 (35)](beijing.geojson)
  // the inner `(` is for regexp grouping
  const arr = readmeContent.match(`\\((\\d+)\\)\\]\\(${city}`);
  if (!arr) return false;
  return parseInt(arr[1], 10) === currentCafes;
};

// if run from CI
if (require.main === module) {
  cities.every(lint);
}

exports.updateCafeNumbers = () => {
  cities.forEach(update);
  console.log(chalk.magenta('Updating README.md, don’t forget to commit it!'));
  fs.writeFileSync(readme, readmeContent);
};
