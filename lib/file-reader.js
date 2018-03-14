'use strict';

const FS = require('fs');
const Readline = require('readline');

const extractURLsFromLine = (line) => {
  return line.split(' ');
};

const isLineValid = (line) => {
  return line.length > 0 && line !== ' ';
};

const readURLsFromFile = (fileName) => {
  const lineReader = Readline.createInterface({
    input: FS.createReadStream(fileName)
  });

  return new Promise((resolve, reject) => {
    let urlList = [];

    lineReader.on('line', (line) => {
      if (isLineValid(line)) {
        urlList.push(extractURLsFromLine(line));
      }
    });

    lineReader.on('close', () => {
      resolve(urlList);
    });
  });
};

module.exports = {
  readURLsFromFile
};
