const { handleTerminal } = require('../../services/terminal');

async function handleInfo() {
  handleTerminal('lando info');
}

module.exports = {
  handleInfo
}
