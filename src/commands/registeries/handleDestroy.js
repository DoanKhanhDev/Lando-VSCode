const vscode = require("vscode");
const { handleTerminal } = require('../../common/common.js');

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

