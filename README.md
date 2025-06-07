# Lando-VSCode Extension

A powerful VS Code extension that streamlines your Lando development workflow by providing easy-to-use commands and configurations.

## Key Features

### Quick Commands
Access all commands via Command Palette (`Ctrl/Cmd + Shift + P`):

- `Lando: generate .lando.yml file` - Create new Lando configuration
- `Lando: generate php.ini file` - Create file php.int to support debug
- `Lando: Generate launch.json file for Xdebug` - Create new Launch configuration support debug
- `Lando: start` - Start Lando environment
- `Lando: restart` - Restart containers
- `Lando: info` - Display environment information
- `Lando: stop` - Stop containers
- `Lando: rebuild` - Rebuild containers
- `Lando: destroy` - Remove containers
- `Lando: clear cache` - Clear Lando cache
- `Lando: SSH` - SSH into container
- `Lando: poweroff` - Shutdown all containers

### Pre-configured Development Stack

- PHP 8.1
- MySQL 5.7
- Drupal 9+
- Drush 10+
- Composer 2
- Mailhog
- Xdebug 3

### Configuration Guide

#### 1. Setup .lando.yml
Use the command palette to generate a basic configuration or customize manually:

```yaml
name: my-project
recipe: drupal9
config:
  php: '8.1'
  via: apache
  webroot: web
  database: mysql:5.7
```

#### 2. Xdebug Setup
Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Listen for Xdebug",
      "type": "php",
      "request": "launch",
      "port": 9003,
      "log": true,
      "hostname": "localhost",
      "pathMappings": {
        "/app/": "${workspaceFolder}/"
      },
      "xdebugSettings": {
        "show_hidden": 1
      }
    }
  ]
}
```

## Requirements

- Visual Studio Code 1.60.0 or higher
- Docker Desktop
- Lando

## Installation

1. Open VS Code
2. Press `Ctrl/Cmd + P`
3. Type `ext install DoanKhanhDev.lando-vscode`

## Support

For issues and feature requests, please visit our [GitHub repository](https://github.com/DoanKhanhDev/Lando-VSCode/issues).

## Buy Me A Coffee

You can support my work by buying me a coffee!

[![Buy Me A Coffee](./images/orange_img.png)](https://buymeacoffee.com/doankhanh.dev)

## License

MIT
