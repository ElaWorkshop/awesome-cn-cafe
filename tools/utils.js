'use strict';

const path = require('path');
const fs = require('fs');

const GEOJSON_EXT = '.geojson';
const ROOT_DIR = path.resolve(__dirname, '..');

const cities = fs
  .readdirSync(ROOT_DIR)
  .filter((filename) => filename.endsWith(GEOJSON_EXT))
  .map((filename) => path.basename(filename, GEOJSON_EXT));

const getCityGeoJSON = (city) => path.resolve(ROOT_DIR, city + GEOJSON_EXT);

module.exports = {
  GEOJSON_EXT,
  ROOT_DIR,
  cities,
  getCityGeoJSON,
};
