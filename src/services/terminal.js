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

  // Create a new terminal or reuse an existing terminal.
  let terminal = vscode.window.terminals.find((terminal) => terminal.name === 'Lando');
  if (!terminal) {
    terminal = vscode.window.createTerminal('lando');
  }
  terminal.show();
  terminal.sendText(command);
}

module.exports = {
  handleTerminal
}
