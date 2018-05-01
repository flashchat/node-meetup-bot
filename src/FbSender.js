const request = require('requestretry');
const { logger, token } = require('./utils');

const options = {
  url: 'https://graph.facebook.com/v2.12/me/messages',
  qs: { access_token: token },
  method: 'POST',
};

const send = ({ userId, message }) => {
  const json = {
    message,
    recipient: { id: userId },
  };
  request({ ...options, json }).then(({ statusCode, body }) => {
    if (statusCode === 200) {
      logger.trace('Success sending message');
    } else {
      logger.error(`Error sending message with ${statusCode} status code:`, body);
    }
  }).catch((err) => {
    logger.error('Error send message:', err);
  });
};

// const sendText = ({ userId, text }) => {
//     send({ userId, { text } })
// }

module.exports = {
  send,
};
