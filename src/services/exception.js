const vscode = require("vscode");
const { log } = require("./log");

/**
 * @param {any} err
 * @param {vscode.OutputChannel} landoChanel
 */
async function handleException(err, landoChanel) {
  await log(landoChanel, `${err}`, 'error');
  vscode.window.showInformationMessage(`${err}`);
}

module.exports = {
  handleException
}
