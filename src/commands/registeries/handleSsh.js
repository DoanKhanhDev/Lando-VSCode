const { handleTerminal } = require('../../services/terminal');

async function handleSsh() {
  handleTerminal('lando ssh');
}

module.exports = {
  handleSsh
}
