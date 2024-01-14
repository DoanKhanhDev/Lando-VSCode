const commands = {
  generate: 'lando-vscode.generateLandoFile',
  start: 'lando-vscode.startLando',
  info: 'lando-vscode.infoLando',
  stop: 'lando-vscode.stopLando',
  rebuild: 'lando-vscode.rebuildLando',
  destroy: 'lando-vscode.destroyLando',
}
const sourceFile = 'assets/.lando.yml';
const destinationFile = '/.lando.yml';

module.exports = {
  commands,
  destinationFile,
  sourceFile,
}
