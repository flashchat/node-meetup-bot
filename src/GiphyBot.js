const { logger } = require('./utils');
const { send } = require('./FbSender');
const requestWrapper = require('./requestWrapper');
const Q = require('q');

const giphyApiRequest = (searchText) => {
  const def = Q.defer();
  const url = 'https://api.giphy.com/v1';
  const edge = 'gifs/search';
  const method = 'GET';
  const qs = {
    api_key: 'y4kaYdri2tmdoFcVAo7LRQZz95zK8Ndn',
    q: searchText,
    limit: 10,
    lang: 'en',
  };
  requestWrapper.apiRequest(url, edge, method, qs).then((body) => {
    const { data } = body;
    const message = data[0].images.fixed_width.url;
    def.resolve(message);
  }).catch(err => def.reject(err));

  return def.promise;
};

const GiphyBot = (ev) => {
  if (ev.message) {
    const userId = ev.sender.id;
    logger.debug(`Message by ${userId}:`, ev.message.text);
    const text = ev.message.text.substring(4, ev.message.text.length);
    giphyApiRequest(text).then((msg) => {
      const message = {
        attachment: {
          type: 'image',
          payload: {
            url: msg,
          },
        },
      };
      send({ userId, message });
    });
  }
};

module.exports = GiphyBot;
