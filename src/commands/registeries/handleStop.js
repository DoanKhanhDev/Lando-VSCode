const { handleTerminal } = require('../../common/common.js');

async function handleStop() {
  handleTerminal('lando stop');
}

module.exports = {
  handleStop
}
