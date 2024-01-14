const vscode = require("vscode");
const { registerCommands } = require('./src/commands/registerCommands');
const { destinationFile } = require('./src/common/constants');
const ctx = require('./src/common/context');

/**
 * @param {vscode.ExtensionContext} context
 */
function init(context) {
  const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  context.subscriptions['pathLandoFile'] = vscode.Uri.file(wsPath + destinationFile);
  context.subscriptions['landoChanel'] = vscode.window.createOutputChannel("Lando");
  ctx.set(context);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  init(context);
  registerCommands();
}

/**
 * @param {vscode.ExtensionContext} context
 */
function deactivate(context) {
  const terminal = context.subscriptions['terminal'];
  if (terminal !== undefined || terminal !== null) {
    terminal.dispose();
  }
}

module.exports = {
  activate,
  deactivate
}
