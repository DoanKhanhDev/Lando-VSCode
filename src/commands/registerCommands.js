const vscode = require("vscode");

const { commands } = require('../common/constants');
const { handleInit } = require('./registeries/handleInit');
const { handleStart } = require('./registeries/handleStart');
const { handleInfo } = require('./registeries/handleInfo');
const { handleStop } = require('./registeries/handleStop');
const { handleRebuild } = require('./registeries/handleRebuild');
const { handleDestroy } = require('./registeries/handleDestroy');

function registerCommands() {
  vscode.commands.registerCommand(commands.generate, handleInit);
  vscode.commands.registerCommand(commands.start, handleStart);
  vscode.commands.registerCommand(commands.info, handleInfo);
  vscode.commands.registerCommand(commands.stop, handleStop);
  vscode.commands.registerCommand(commands.rebuild, handleRebuild);
  vscode.commands.registerCommand(commands.destroy, handleDestroy);
}

module.exports = {
  registerCommands
}
