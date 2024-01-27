const { handleTerminal } = require('../../common/common.js');

async function handlePoweroff() {
  handleTerminal('lando poweroff');
}

module.exports = {
  handlePoweroff
}
