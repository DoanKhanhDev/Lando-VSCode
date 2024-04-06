const commands = {
  generate: 'lando-vscode.generateLandoFile',
  start: 'lando-vscode.startLando',
  info: 'lando-vscode.infoLando',
  stop: 'lando-vscode.stopLando',
  rebuild: 'lando-vscode.rebuildLando',
  destroy: 'lando-vscode.destroyLando',
  clear: 'lando-vscode.clearLando',
  ssh: 'lando-vscode.sshLando',
  poweroff: 'lando-vscode.poweroffLando',
}
const configConstants = {
  configSection: 'lando-vscode',
  configMailHog: {
    tokenHost: '$mailhog_host$',
    tokenPlugin: '$mailhog_plugin$',
    host: '  mailhog:\n    type: mailhog\n    hogfrom:\n      - appserver',
    plugin: `plugins:\n  "@lando/mailhog": ../..\n  "@lando/php": ../../node_modules/@lando/php`
  },
  configRecipe: {
    token: '$recipe$',
  },
  configExcludes: {
    token: '$excludes$',
    prefix: 'excludes:\n'
  }
}
const sourceFile = 'assets/.lando.yml';
const destinationFile = '/.lando.yml';

module.exports = {
  commands,
  destinationFile,
  sourceFile,
  configConstants
}
