const { handleTerminal } = require('../../common/common.js');

async function handleInfo() {
  handleTerminal('lando info');
}

module.exports = {
  handleInfo
}
