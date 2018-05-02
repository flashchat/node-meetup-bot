
const log4js = require('log4js');
const bodyParser = require('body-parser');
const validUrl = require('valid-url');

const logger = log4js.getLogger();
logger.level = 'trace';

const port = 3300;

const generateElements = (m) => {
  return {
    title: m.title,
    image_url: m.urlToImage,
    subtitle: m.description,
    buttons: [{
      type: 'web_url',
      url: m.url,
      title: 'View Website',
    }],
  };
};

// ==== Page settings ====
const token = process.env.PAGE_TOKEN;
const giphyApiKey = process.env.GIPHY_API_KEY;
const newsApiKey = process.env.NEWS_API_KEY;

module.exports = {
  logger,
  bodyParser,
  port,
  token,
  validUrl,
  giphyApiKey,
  newsApiKey,
  generateElements,
};
