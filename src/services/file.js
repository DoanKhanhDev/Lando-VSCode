const fs = require("fs");
const vscode = require("vscode");
const { log } = require("./log");
const { configLandoFile } = require("../constants");

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
 * @returns Bool
 */
async function isExistFile(path) {
  if (!fs.existsSync(path)) {
    vscode.window.showErrorMessage(`The ${path} file not exists!`);
    return false;
  }
  return true;
}

/**
 * @param {vscode.WorkspaceEdit} wsedit
 * @param {vscode.Uri} pathLandoFile
 * @param {any} data
 * @param {vscode.OutputChannel} landoChanel
 */
async function createFile(wsedit, pathLandoFile, data, landoChanel) {
  wsedit.createFile(pathLandoFile, { ignoreIfExists: true });
  await vscode.workspace.fs.writeFile(pathLandoFile, data);
  let isDone = await vscode.workspace.applyEdit(wsedit);
  if (isDone) {
    await log(landoChanel, `File created successfully at ${configLandoFile.destinationFile}`, 'notice');
    vscode.window.showInformationMessage(`File created successfully at ${configLandoFile.destinationFile}`);
  }
  await vscode.workspace.openTextDocument(pathLandoFile);
}

module.exports = {
  isNotExistFile,
  isExistFile,
  createFile
}
