# Lando-VSCode Extension

A powerful VS Code extension that streamlines your Lando development workflow by providing easy-to-use commands and configurations.

## Key Features

### Quick Commands
Access all commands via Command Palette (`Ctrl/Cmd + Shift + P`):

- `Lando: generate .lando.yml file` - Create new Lando configuration
- `Lando: start` - Start Lando environment
- `Lando: restart` - Restart containers
- `Lando: info` - Display environment information
- `Lando: stop` - Stop containers
- `Lando: rebuild` - Rebuild containers
- `Lando: destroy` - Remove containers
- `Lando: clear cache` - Clear Lando cache
- `Lando: SSH` - SSH into container
- `Lando: poweroff` - Shutdown all containers
- `Lando: generate php.ini file` - Create development PHP configuration

### Pre-configured Development Stack

- PHP 8.1
- MySQL 5.7
- Drupal 9+
- Drush 10+
- Composer 2
- Mailhog for email testing
- Xdebug integration
- Acquia BLT support

### Customizable Settings

Configure your project defaults through VS Code settings:
- Recipe selection
- File exclusions
- Mailhog settings

## Xdebug 3 Configuration

### 1. PHP Configuration
Create `lando/php.ini`:

```
[PHP]
xdebug.max_nesting_level = 256
xdebug.show_exception_trace = 0
xdebug.collect_params = 0
xdebug.mode = debug
xdebug.client_host = ${LANDO_HOST_IP}
xdebug.client_port = 9003
xdebug.start_with_request = yes
xdebug.log = /app/lando/xdebug.log
display_errors = On
log_errors = On
error_log = /app/lando/php_error.log
```

Create `/.vscode/launch.json` as below

```
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

## Release Notes

Detailed Release Notes are available [here](https://github.com/DoanKhanhDev/Lando-VSCode/blob/master/CHANGELOG.md).

## Visual Studio Marketplace

This extension is available on the for [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=DoanKhanhDev.lando-vscode).

## Related DOC

- Lando: https://docs.lando.dev/
- Docker: https://docs.docker.com/
