const { handleTerminal } = require('../../common/common.js');

async function handleClear() {
  handleTerminal('lando --clear');
}

module.exports = {
  handleClear
}
