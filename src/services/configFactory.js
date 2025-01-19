const vscode = require("vscode");
const { configConstants } = require('../constants');

/**
 * Set the configurations.
 *
 * @param {boolean} status
 * @param {string} token
 * @param {string} value
 * @param {string} config
 */
async function setConfiguration(status, token, value, config) {
  if (!status) {
    return config.replaceAll(token + '\n', '');
  }
  return config.replaceAll(token, value);
}

/**
 * Get configuration.
 *
 * @returns vscode.WorkspaceConfiguration
 */
async function getConfigurations() {
  return vscode.workspace.getConfiguration(configConstants.configSection);
}

module.exports = {
  setConfiguration,
  getConfigurations
}
