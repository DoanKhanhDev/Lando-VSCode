const vscode = require("vscode");
const { configLaunchFile } = require('../../constants');
const { isNotExistFile, createFile } = require('../../services/file');
const { handleException } = require("../../services/exception");
const ctx = require('../../services/context');


async function handleLaunchXdebug() {
  const context = ctx.get();
  const wsPath = context.workspaceState.get('wsPath');
  const isNotExist = await isNotExistFile(wsPath, configLaunchFile.destinationFile);
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
      vscode.Uri.file(context.asAbsolutePath(configLaunchFile.sourceFile))
    );

    // Replace content.
    var string = data.toString();
    data = new TextEncoder().encode(string);

    // Create file
    await createFile(configLaunchFile.destinationFile, data);

  } catch (err) {
    await handleException(err);
  }
}

module.exports = {
  handleLaunchXdebug
}
