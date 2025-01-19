const moment = require("moment");

/**
 * Handle log for lando chanel.
 *
 * @param {import('vscode').OutputChannel} outputChannel
 * @param {string} message
 * @param {string} type
 */
async function log(outputChannel, message, type) {
  const currentTime = moment().format('Y-m-d H:i:s');
  outputChannel.appendLine(`[${currentTime}] [${type}] ${message}`);
}

module.exports = {
  log
}
