const { handleTerminal } = require('../../services/terminal');

async function handleClear() {
  handleTerminal('lando --clear');
}

module.exports = {
  handleClear
}
