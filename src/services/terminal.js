const vscode = require("vscode");
const { isExistFile } = require("./file");
const ctx = require('./context');
const { configLandoFile } = require('../constants');

/**
 * @param {string} command
 */
async function handleTerminal(command) {
  const context = ctx.get();
  const wsPath = context.workspaceState.get('wsPath');;
  if (!await isExistFile(wsPath, configLandoFile.destinationFile)) {
    return;
  }
  let terminal = context.workspaceState.get('terminal', null);
  if (terminal === undefined || terminal === null) {
    terminal = vscode.window.createTerminal(`Lando`);
    context.workspaceState.update(terminal, terminal);
  }
  terminal.show();
  terminal.sendText(command);
  vscode.window.onDidCloseTerminal(() => {
    context.workspaceState.update(terminal, null);
  })
  ctx.set(context);
}

module.exports = {
  handleTerminal
}
