const vscode = require("vscode");
const { configPhpFile } = require('../../constants');
const { isNotExistFile, createFile } = require('../../services/file');
const { handleException } = require("../../services/exception");
const ctx = require('../../services/context');


async function handleInitPhp() {
  const context = ctx.get();
  const wsPath = context.subscriptions['wsPath'];
  const isNotExist = await isNotExistFile(wsPath, configPhpFile.destinationFile);
  if (isNotExist) {
    await generateFile(context);
  }
}

/**
 * Handle copy a file from assets to workspace.
 *
 * @param {vscode.ExtensionContext} context
 */
async function generateFile(context) {
  const wsPath = context.subscriptions['wsPath'];
  const landoChanel = context.subscriptions['landoChanel'];
  const pathPhpFile = vscode.Uri.file(wsPath + configPhpFile.destinationFile);
  try {
    const wsedit = new vscode.WorkspaceEdit();
    var data = await vscode.workspace.fs.readFile(
      vscode.Uri.file(context.asAbsolutePath(configPhpFile.sourceFile))
    );

    // Replace content.
    var string = data.toString();
    data = new TextEncoder().encode(string);

    // Create file
    createFile(wsedit, pathPhpFile, data, landoChanel);

  } catch (err) {
    handleException(err, landoChanel);
  }
}

module.exports = {
  handleInitPhp
}
