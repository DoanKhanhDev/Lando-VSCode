const fs = require('fs');
const moment = require('moment');
const vscode = require("vscode");
const landoChanel = vscode.window.createOutputChannel("Lando");
const commands = {
  generate: 'lando-vscode.generateLandoFile',
}
const sourceFile = 'assets/.lando.yml';
const destinationFile = '/.lando.yml';
const wsedit = new vscode.WorkspaceEdit();
const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
const filePath = vscode.Uri.file(wsPath + destinationFile);

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
 * Handle log for lando chanel.
 * 
 * @param {vscode.OutputChannel} outputChannel 
 * @param {string} message 
 * @param {string} type 
 */
async function log(outputChannel, message, type) {
  const currentTime = moment().format('Y-m-d H:i:s');
  outputChannel.appendLine(`[${currentTime}] [${type}] ${message}`);
}

/**
 * Handle copy a file from assets to workspace.
 *
 * @param {vscode.ExtensionContext} context
 * @param {Array} config
 */
async function generateFile(context, config) {
  try {
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
    wsedit.createFile(filePath, { ignoreIfExists: true });
    await vscode.workspace.fs.writeFile(filePath, data);
    let isDone = await vscode.workspace.applyEdit(wsedit);
    if (isDone) {
      await log(landoChanel, `File created successfully at ${destinationFile}`, 'notice');
      vscode.window.showInformationMessage(`File created successfully at ${destinationFile}`);
    }
    await vscode.workspace.openTextDocument(filePath).then(doc => {
      vscode.window.showTextDocument(doc);
    });
  } catch (err) {
    await log(landoChanel, `${err}`, 'error');
    vscode.window.showInformationMessage(`${err}`);
  }
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  const handleInit = async () => {
    let isNotExist = true;
    // Check exits file.
    if (fs.existsSync(filePath.fsPath)) {
      vscode.window.showErrorMessage(`The .lando.yml file exists!`);
      isNotExist = false;
    }

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
   * Command generate .lando.yml file.
   */
  let initDisposable = vscode.commands.registerCommand(commands.generate, handleInit);
  context.subscriptions.push(initDisposable);
}

module.exports = {
  activate,
};
