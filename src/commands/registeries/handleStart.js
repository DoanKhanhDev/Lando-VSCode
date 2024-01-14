const { handleTerminal } = require('../../common/common.js');

async function handleStart() {
  handleTerminal('lando start');
}

module.exports = {
  handleStart
}
