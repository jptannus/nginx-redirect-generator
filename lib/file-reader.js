'use strict';

const FS = require('fs');
const Readline = require('readline');

const extractURLsFromLine = (line) => {
  let urls = line.split(' ');
  let result = urls;
  if (urls.length > 2) {
    result = [];
    urls.forEach((url) => {
      if (url !== '') {
        result.push(url);
      }
    });
  }
  return result;
};

const isLineValid = (line) => {
  return line.length > 0 && line !== ' ' && line !== '\t';
};

const readURLsFromFile = (fileName) => {
  const lineReader = Readline.createInterface({
    input: FS.createReadStream(fileName)
  });

  return new Promise((resolve, reject) => {
    let urlList = [];

    lineReader.on('line', (line) => {
      line = line.replace('\t', ' ');
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
