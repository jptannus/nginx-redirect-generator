'use strict';

const { readURLsFromFile } = require('./lib/file-reader');
const Parameter = require('./lib/parameter');
const { generateRedirects } = require('./lib/generator');

readURLsFromFile(Parameter.sourceFile)
  .then(generateRedirects)
  .then(console.log);
