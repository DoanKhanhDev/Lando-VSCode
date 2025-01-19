const commandMachineNames = {
  generateLandoFile: 'lando-vscode.generateLandoFile',
  generatePhpFile: 'lando-vscode.generatePhpFile',
  start: 'lando-vscode.startLando',
  restart: 'lando-vscode.restartLando',
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

const configLandoFile = {
  sourceFile: 'assets/.lando.yml',
  destinationFile: '/.lando.yml',
}

const configPhpFile = {
  sourceFile: 'assets/php.ini',
  destinationFile: '/lando/php.ini',
}

module.exports = {
  commandMachineNames,
  configLandoFile,
  configPhpFile,
  configConstants
}
