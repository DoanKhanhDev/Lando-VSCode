const vscode = require("vscode");

const { commands } = require('../common/constants');
const { handleInit } = require('./registeries/handleInit');
const { handleStart } = require('./registeries/handleStart');
const { handleInfo } = require('./registeries/handleInfo');
const { handleStop } = require('./registeries/handleStop');
const { handleRebuild } = require('./registeries/handleRebuild');
const { handleDestroy } = require('./registeries/handleDestroy');
const { handleClear } = require('./registeries/handleClear');
const { handleSsh } = require('./registeries/handleSsh');
const { handlePoweroff } = require('./registeries/handlePoweroff');

function registerCommands() {
  vscode.commands.registerCommand(commands.generate, handleInit);
  vscode.commands.registerCommand(commands.start, handleStart);
  vscode.commands.registerCommand(commands.info, handleInfo);
  vscode.commands.registerCommand(commands.stop, handleStop);
  vscode.commands.registerCommand(commands.rebuild, handleRebuild);
  vscode.commands.registerCommand(commands.destroy, handleDestroy);
  vscode.commands.registerCommand(commands.clear, handleClear);
  vscode.commands.registerCommand(commands.ssh, handleSsh);
  vscode.commands.registerCommand(commands.poweroff, handlePoweroff);
}

module.exports = {
  registerCommands
}
