const vscode = require("vscode");
const { registerCommands } = require('./src/commands/registerCommands');
const ctx = require('./src/services/context');

/**
 * @param {vscode.ExtensionContext} context
 */
function init(context) {
  const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  context.workspaceState.update('wsPath', wsPath);
  context.workspaceState.update('landoChanel', vscode.window.createTerminal('Lando'));
  ctx.set(context);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  init(context);
  registerCommands(context);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function deactivate(context) {
  const terminal = context.workspaceState.get('termial');
  if (terminal !== undefined || terminal !== null) {
    terminal.dispose();
  }
}

module.exports = {
  activate,
  deactivate
}
