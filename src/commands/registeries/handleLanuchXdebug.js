const vscode = require("vscode");
const { configLanuchFile } = require('../../constants');
const { isNotExistFile, createFile } = require('../../services/file');
const { handleException } = require("../../services/exception");
const ctx = require('../../services/context');


async function handleLanuchXdebug() {
  const context = ctx.get();
  const wsPath = context.workspaceState.get('wsPath');
  const isNotExist = await isNotExistFile(wsPath, configLanuchFile.destinationFile);
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
  try {
    var data = await vscode.workspace.fs.readFile(
      vscode.Uri.file(context.asAbsolutePath(configLanuchFile.sourceFile))
    );

    // Replace content.
    var string = data.toString();
    data = new TextEncoder().encode(string);

    // Create file
    await createFile(configLanuchFile.destinationFile, data);

  } catch (err) {
    await handleException(err);
  }
}

module.exports = {
  handleLanuchXdebug
}
