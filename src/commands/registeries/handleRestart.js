const { handleTerminal } = require('../../services/terminal');

async function handleRestart() {
  handleTerminal('lando restart');
}

module.exports = {
  handleRestart
}
