'use strict';

const extractDomain = (url) => {
  return url.split('/')[2];
};

const extractPath = (url) => {
  return url.split(extractDomain(url))[1];
};

const createRedirectItem = (urlPair) => ({
  path: extractPath(urlPair[0]),
  target: urlPair[1],
  permanent: true
});

const buildredirectMap = (urlList) => {
  let domainMap = {};
  urlList.forEach((urlPair) => {
    let domain = extractDomain(urlPair[0]);
    if (!domainMap[domain]) {
      domainMap[domain] = [];
    }
    domainMap[domain].push(createRedirectItem(urlPair));
  });
  return domainMap;
};

const buildRedirectString = (redirectItem) => {
  let permanent = 'redirect';
  if (permanent) {
    permanent = 'permanent'
  }
  return `    rewrite ^${redirectItem.path}$ ${redirectItem.target} ${permanent};\n`;
};

const buildStringForDomain = (redirectList) => {
  let result = '';
  redirectList.forEach((item) => {
    result += buildRedirectString(item);
  });
  return result;
};

const buildDomainPrefix = (domain) => {
  return `  server {\n    listen 8080;\n    server_name ${domain};\n`;
}

const buildDomainSufix = () => {
  return '  }\n';
}

const buildMapString = (redirectMap) => {
  let result = '';
  Object.keys(redirectMap).forEach((domain) => {
    result += buildDomainPrefix(domain);
    result += buildStringForDomain(redirectMap[domain]);
    result += buildDomainSufix(domain);
  });
  return result;
};

const getHTTPPrefix = () => {
  return 'events {}\n\nhttp {\n';
};

const getHTTPSufix = () => {
  return '}\n';
};

const generateRedirects = (urlList) => {
  let result = getHTTPPrefix();
  result += buildMapString(buildredirectMap(urlList));
  result += getHTTPSufix();
  return result;
};

module.exports = {
  generateRedirects
};
