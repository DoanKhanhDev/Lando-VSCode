const vscode = require("vscode");
const { destinationFile, sourceFile } = require('../../common/constants');
const { log, isNotExistLandoFile } = require('../../common/common.js');
const ctx = require('../../common/context');

async function handleInit() {
  const context = ctx.get();
  const pathLandoFile = context.subscriptions['pathLandoFile'];
  let isNotExist = await isNotExistLandoFile(pathLandoFile.fsPath);

  // Enter name project
  const name = isNotExist && await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: 'Please enter project name.'
  }).then(handleValue);

  // Enter webroot project.
  const webroot = name ? await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: 'Please enter project webroot.'
  }).then(handleValue) : name;

  // Enter webroot project.
  const domain = webroot ? await vscode.window.showInputBox({
    ignoreFocusOut: true,
    placeHolder: 'Please enter project domain. Example: {domain}.lndo.site'
  }).then(handleValue) : webroot;

  // Handle create file ./lando.yml
  if (name && webroot && domain) {
    const config = [
      {
        seachValue: '$name$',
        replaceValue: name,
      },
      {
        seachValue: '$webroot$',
        replaceValue: webroot,
      },
      {
        seachValue: '$domain$',
        replaceValue: domain,
      },
    ]
    await generateFile(context, config);
  }
}

/**
 * Handle cancel for init lando.
 * 
 * @param {*} value
 */
async function handleValue(value) {
  if (value === undefined) {
    return false;
  }
  return value;
}

/**
 * Handle copy a file from assets to workspace.
 *
 * @param {vscode.ExtensionContext} context
 * @param {Array} config
 */
async function generateFile(context, config) {
  const landoChanel = context.subscriptions['landoChanel'];
  const pathLandoFile = context.subscriptions['pathLandoFile'];
  try {
    const wsedit = new vscode.WorkspaceEdit();
    var data = await vscode.workspace.fs.readFile(
      vscode.Uri.file(context.asAbsolutePath(sourceFile))
    );

    // Replace content.
    var string = data.toString();
    config.forEach((element) => {
      string = string.replaceAll(element.seachValue, element.replaceValue);
    });
    data = new TextEncoder().encode(string);

    // Create file
    wsedit.createFile(pathLandoFile, { ignoreIfExists: true });
    await vscode.workspace.fs.writeFile(pathLandoFile, data);
    let isDone = await vscode.workspace.applyEdit(wsedit);
    if (isDone) {
      await log(landoChanel, `File created successfully at ${destinationFile}`, 'notice');
      vscode.window.showInformationMessage(`File created successfully at ${destinationFile}`);
    }
    await vscode.workspace.openTextDocument(pathLandoFile);
  } catch (err) {
    await log(landoChanel, `${err}`, 'error');
    vscode.window.showInformationMessage(`${err}`);
  }
}

module.exports = {
  handleInit
}
