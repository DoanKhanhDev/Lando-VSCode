const { handleTerminal } = require('../../services/terminal');

async function handleStop() {
  handleTerminal('lando stop');
}

module.exports = {
  handleStop
}
