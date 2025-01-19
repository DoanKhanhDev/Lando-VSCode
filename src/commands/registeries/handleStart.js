const { handleTerminal } = require('../../services/terminal');

async function handleStart() {
  handleTerminal('lando start');
}

module.exports = {
  handleStart
}
