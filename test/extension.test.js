const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { commandMachineNames } = require('../src/constants');

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

suite('Package.json Configuration Tests', () => {

	test('should have valid basic extension fields', () => {
		assert.strictEqual(packageJson.name, 'lando-vscode');
		assert.strictEqual(packageJson.publisher, 'DoanKhanhDev');
		assert.strictEqual(typeof packageJson.version, 'string');
		assert.strictEqual(typeof packageJson.description, 'string');
	});

	test('should have valid recipe configuration', () => {
		const recipeConfig = packageJson.contributes.configuration.properties['lando-vscode.recipe'];
		assert.strictEqual(recipeConfig.type, 'string');
		assert.strictEqual(recipeConfig.default, 'drupal9');
		assert.deepStrictEqual(recipeConfig.enum, ['lamp', 'drupal8', 'drupal9', 'drupal10']);
	});

	test('should have required lando commands', () => {
		const commands = packageJson.contributes.commands.map(cmd => cmd.command);
		const requiredCommands = Object.values(commandMachineNames);

		requiredCommands.forEach(cmd => {
			assert(commands.includes(cmd), `Missing required command: ${cmd}`);
		});
	});

	test('should have valid menu contributions', () => {
		assert(packageJson.contributes.menus['explorer/context']);
		assert(packageJson.contributes.menus['lando.explorer.context']);

		const contextMenuItems = packageJson.contributes.menus['lando.explorer.context'];
		assert(Array.isArray(contextMenuItems));
		assert(contextMenuItems.length > 0);
	});

	test('should have valid mailhog configuration', () => {
		const mailhogConfig = packageJson.contributes.configuration.properties['lando-vscode.mailhog'];
		assert.strictEqual(mailhogConfig.type, 'boolean');
		assert.strictEqual(mailhogConfig.default, true);
	});

	test('should have valid excludes configuration', () => {
		const excludesConfig = packageJson.contributes.configuration.properties['lando-vscode.excludes'];
		assert.strictEqual(excludesConfig.type, 'array');
		assert.deepStrictEqual(excludesConfig.default, []);
	});

	test('should have all required dependencies', () => {
		const requiredDevDeps = ['@types/mocha', '@types/node', '@types/vscode'];
		requiredDevDeps.forEach(dep => {
			assert(packageJson.devDependencies[dep], `Missing required dev dependency: ${dep}`);
		});
	});
});
