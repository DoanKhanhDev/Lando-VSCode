const moment = require("moment");
const ctx = require('./context');

/**
 * Handle log for lando chanel.
 *
 * @param {string} message
 * @param {string} type
 */
async function log(message, type) {
  const currentTime = moment().format('Y-m-d H:i:s');
  const context = ctx.get();
  const landoChanel = context.workspaceState.get('landoChanel');
  landoChanel.appendLine(`[${currentTime}] [${type}] ${message}`);
}

module.exports = {
  log
}
