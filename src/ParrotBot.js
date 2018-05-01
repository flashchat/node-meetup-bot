const { logger } = require('./utils');
const { send } = require('./FbSender');

const ParrotBot = (ev) => {
  if (ev.message) {
    const userId = ev.sender.id;
    logger.debug(`Message by ${userId}:`, ev.message.text);
    const { text } = ev.message;
    const echoedText = `Parrot says: ${text}`;
    const message = { text: echoedText };
    send({ userId, message });
  }
};

module.exports = ParrotBot;
