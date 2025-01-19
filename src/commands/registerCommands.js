const vscode = require("vscode");

const { commandMachineNames } = require('../constants');
const { handleInitLando } = require('./registeries/handleInitLando');
const { handleInitPhp } = require('./registeries/handleInitPhp');
const { handleStart } = require('./registeries/handleStart');
const { handleRestart } = require('./registeries/handleRestart');
const { handleInfo } = require('./registeries/handleInfo');
const { handleStop } = require('./registeries/handleStop');
const { handleRebuild } = require('./registeries/handleRebuild');
const { handleDestroy } = require('./registeries/handleDestroy');
const { handleClear } = require('./registeries/handleClear');
const { handleSsh } = require('./registeries/handleSsh');
const { handlePoweroff } = require('./registeries/handlePoweroff');

/**
 * @param {vscode.ExtensionContext} context
 */
function registerCommands(context) {
  const commands = new Map([
    [commandMachineNames.generateLandoFile, handleInitLando],
    [commandMachineNames.generatePhpFile, handleInitPhp],
    [commandMachineNames.start, handleStart],
    [commandMachineNames.restart, handleRestart],
    [commandMachineNames.info, handleInfo],
    [commandMachineNames.stop, handleStop],
    [commandMachineNames.rebuild, handleRebuild],
    [commandMachineNames.destroy, handleDestroy],
    [commandMachineNames.clear, handleClear],
    [commandMachineNames.ssh, handleSsh],
    [commandMachineNames.poweroff, handlePoweroff],
  ]);

  commands.forEach((handler, commandMachineName) => {
    const disposable = vscode.commands.registerCommand(commandMachineName, handler);
    context.subscriptions.push(disposable);
  });}

module.exports = {
  registerCommands
}
