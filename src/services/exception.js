const vscode = require("vscode");
const { log } = require("./log");

/**
 * @param {any} err
 */
async function handleException(err) {
  await log(`${err}`, 'error');
  vscode.window.showInformationMessage(`${err}`);
}

module.exports = {
  handleException
}
