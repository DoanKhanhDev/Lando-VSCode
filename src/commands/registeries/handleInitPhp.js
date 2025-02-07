const vscode = require("vscode");
const { configPhpFile } = require('../../constants');
const { isNotExistFile, createFile } = require('../../services/file');
const { handleException } = require("../../services/exception");
const ctx = require('../../services/context');


async function handleInitPhp() {
  const context = ctx.get();
  const wsPath = context.workspaceState.get('wsPath');
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
  try {
    var data = await vscode.workspace.fs.readFile(
      vscode.Uri.file(context.asAbsolutePath(configPhpFile.sourceFile))
    );

    // Replace content.
    var string = data.toString();
    data = new TextEncoder().encode(string);

    // Create file
    await createFile(configPhpFile.destinationFile, data);

  } catch (err) {
    await handleException(err);
  }
}

module.exports = {
  handleInitPhp
}
