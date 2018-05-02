
const log4js = require('log4js');

const bodyParser = require('body-parser');

const logger = log4js.getLogger();
logger.level = 'trace';

const port = 3300;

// ==== Page settings ====
const token = process.env.PAGE_TOKEN;
const giphyApiKey = process.env.GIPHY_API_KEY;

module.exports = {
  logger,
  bodyParser,
  port,
  token,
  giphyApiKey,
};
