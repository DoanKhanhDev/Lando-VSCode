const { handleTerminal } = require('../../common/common.js');

async function handleSsh() {
  handleTerminal('lando ssh');
}

module.exports = {
  handleSsh
}
