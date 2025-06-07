const vscode = require("vscode");
const { configLandoFile, configConstants } = require('../../constants');
const { isNotExistFile, createFile } = require('../../services/file');
const { getConfigurations, setConfiguration } = require('../../services/configFactory');
const { handleException } = require('../../services/exception');
const ctx = require('../../services/context');

async function handleInitLando() {
  const context = ctx.get();
  const wsPath = context.workspaceState.get('wsPath');
  const isNotExist = await isNotExistFile(wsPath, configLandoFile.destinationFile);
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
 * Handle copy a file from assets to workspace.
 *
 * @param {vscode.ExtensionContext} context
 * @param {Array} config
 */
async function generateFile(context, config) {
  const commonConfig = await getConfigurations();
  try {
    var data = await vscode.workspace.fs.readFile(
      vscode.Uri.file(context.asAbsolutePath(configLandoFile.sourceFile))
    );

    // Replace content.
    var string = data.toString();
    config.forEach((element) => {
      string = string.replaceAll(element.seachValue, element.replaceValue);
    });

    // Apply the common configuration.
    // Set the mailhog plugin.
    const isMailHog = commonConfig.get('mailhog');
    string = await setConfiguration(
      isMailHog,
      configConstants.configMailHog.tokenHost,
      configConstants.configMailHog.host,
      string
    );
    string = await setConfiguration(
      isMailHog,
      configConstants.configMailHog.tokenPlugin,
      configConstants.configMailHog.plugin,
      string
    );

    // Set the recipe.
    const recipe = commonConfig.get('recipe');
    string = await setConfiguration(
      true,
      configConstants.configRecipe.token,
      recipe,
      string
    );

    // Set the excludes.
    let excludes = commonConfig.get('excludes');
    excludes = excludes.map((element) => {
      return '  - ' + element;
    })
    string = await setConfiguration(
      excludes.length > 0,
      configConstants.configExcludes.token,
      configConstants.configExcludes.prefix + excludes.join('\n'),
      string
    );

    data = new TextEncoder().encode(string);

    // Create file
    await createFile(configLandoFile.destinationFile, data);

    if (commonConfig.get('generateAll')) {
      // Run command to generate all.
      await vscode.commands.executeCommand('lando-vscode.generatePhpFile');
      await vscode.commands.executeCommand('lando-vscode.generateLaunchFile');
    }

  } catch (err) {
    await handleException(err);
  }
}

module.exports = {
  handleInitLando
}
