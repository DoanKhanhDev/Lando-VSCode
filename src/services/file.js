const fs = require("fs");
const vscode = require("vscode");
const { log } = require("./log");
const ctx = require('./context');

/**
 * @param {string} path
 * @param {string} destinationFile
 * @returns Bool
 */
async function isNotExistFile(path, destinationFile) {
  if (fs.existsSync(path + destinationFile)) {
    vscode.window.showErrorMessage(`The ${destinationFile} file exists!`);
    return false;
  }
  return true;
}

/**
 * @param {string} path
 * @param {string} destinationFile
 * @returns Bool
 */
async function isExistFile(path, destinationFile) {
  if (!fs.existsSync(path + destinationFile)) {
    vscode.window.showErrorMessage(`The ${destinationFile} file not exists!`);
    return false;
  }
  return true;
}

/**
 * @param {string} pathFile
 * @param {any} data
 */
async function createFile(pathFile, data) {
  const context = ctx.get();
  const wsPath = context.workspaceState.get('wsPath');
  const wsedit = new vscode.WorkspaceEdit();
  const uriFile = vscode.Uri.file(wsPath + pathFile);

  // Create file and write data.
  wsedit.createFile(uriFile, { ignoreIfExists: true });
  await vscode.workspace.fs.writeFile(uriFile, data);

  // Apply edit.
  const isDone = await vscode.workspace.applyEdit(wsedit);
  if (isDone) {
    await log(`File created successfully at ${pathFile}`, 'notice');
    vscode.window.showInformationMessage(`File created successfully at ${pathFile}`);
  }

  // Open file.
  await vscode.workspace.openTextDocument(uriFile);
}

module.exports = {
  isNotExistFile,
  isExistFile,
  createFile
}
