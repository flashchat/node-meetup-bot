/* global */

const express = require('express');

const { logger, bodyParser, port } = require('./src/utils');
const ParrotBot = require('./src/ParrotBot');
const GiphyBot = require('./src/GiphyBot');
const NewsBot = require('./src/NewsBot');

const app = express().use(bodyParser.json()); // creates express http server


app.listen(port, () => {
  logger.info(`Bot STARTS, listening in port ${port}`);
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'CXZ') {
    logger.info('Validating webhook');
    res.status(200).send(req.query['hub.challenge']);
  } else {
    logger.fatal('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});
// Listening incoming requests from router


app.post('/webhook', (req, res) => {
  const { body } = req;
  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach((entry) => {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      if (entry.messaging) {
        const event = entry.messaging[0];
        const message = event.message.text.toLowerCase();
        if (message.startsWith('gif')) {
          GiphyBot(event);
        } else if (message.startsWith('news')) {
          NewsBot(event);
        } else {
          ParrotBot(event);
        }
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});
