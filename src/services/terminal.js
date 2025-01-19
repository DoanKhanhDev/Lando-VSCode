const vscode = require("vscode");
const { isExistFile } = require("./file");
const ctx = require('./context');

/**
 * @param {string} command
 */
async function handleTerminal(command) {
  const context = ctx.get();
  const pathLandoFile = context.subscriptions['pathLandoFile'];
  if (!await isExistFile(pathLandoFile.fsPath)) {
    return;
  }
  let terminal = context.subscriptions['terminal'];
  if (terminal === undefined || terminal === null) {
    terminal = vscode.window.createTerminal(`Lando`);
    context.subscriptions['terminal'] = terminal;
  }
  terminal.show();
  terminal.sendText(command);
  vscode.window.onDidCloseTerminal(() => {
    context.subscriptions['terminal'] = null;
  })
  ctx.set(context);
}

module.exports = {
  handleTerminal
}
