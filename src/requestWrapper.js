const request = require('requestretry');
const Q = require('q');

const requestWrapper = (url, edge, method, qs = {}) => {
  const def = Q.defer();
  request({
    url: `${url}/${edge}`,
    method,
    qs,
    maxAttempts: 5,
    retryDelay: 5000,
  }).then(({ body = {} }) => {
    def.resolve(JSON.parse(body)); 
  }).catch(err => def.reject(JSON.parse(err)));
  return def.promise;
};

module.exports = {
  requestWrapper,
};
