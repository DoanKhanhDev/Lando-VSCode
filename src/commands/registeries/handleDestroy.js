const vscode = require("vscode");
const { handleTerminal } = require('../../services/terminal');

async function handleDestroy() {
  let response = await vscode.window.showQuickPick([
    'Yes',
    'No',
  ], { placeHolder: 'Please confirm to destroy.' });
  if (response.toString() === 'Yes') {
    handleTerminal('lando destroy -y');
  }
}

module.exports = {
  handleDestroy
}

