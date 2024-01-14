const fs = require("fs");
const vscode = require("vscode");
const moment = require("moment");
const ctx = require('../common/context');
/**
 * @param {string} path 
 * @returns Bool
 */
async function isNotExistLandoFile(path) {
  if (fs.existsSync(path)) {
    vscode.window.showErrorMessage(`The .lando.yml file exists!`);
    return false;
  }
  return true;
}

/**
 * @param {string} path 
 * @returns Bool
 */
async function isExistLandoFile(path) {
  if (!fs.existsSync(path)) {
    vscode.window.showErrorMessage(`The .lando.yml file not exists!`);
    return false;
  }
  return true;
}

/**
 * @param {string} command 
 */
async function handleTerminal(command) {
  const context = ctx.get();
  const pathLandoFile = context.subscriptions['pathLandoFile'];
  if (!await isExistLandoFile(pathLandoFile.fsPath)) {
    return;
  }
  let terminal = context.subscriptions['terminal'];
  if (terminal === undefined || terminal === null) {
    terminal = vscode.window.createTerminal(`Lando`);
    context.subscriptions['terminal'] = terminal;
  }
  terminal.show();
  terminal.sendText(command);
  vscode.window.onDidCloseTerminal(terminal => {
    context.subscriptions['terminal'] = null;
  })
  ctx.set(context);
}


/**
 * Handle log for lando chanel.
 * 
 * @param {vscode.OutputChannel} outputChannel 
 * @param {string} message 
 * @param {string} type 
 */
async function log(outputChannel, message, type) {
  const currentTime = moment().format('Y-m-d H:i:s');
  outputChannel.appendLine(`[${currentTime}] [${type}] ${message}`);
}

module.exports = {
  isNotExistLandoFile,
  isExistLandoFile,
  log,
  handleTerminal
}
