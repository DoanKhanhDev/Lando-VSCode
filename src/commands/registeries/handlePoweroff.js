const { handleTerminal } = require('../../services/terminal');

async function handlePoweroff() {
  handleTerminal('lando poweroff');
}

module.exports = {
  handlePoweroff
}
