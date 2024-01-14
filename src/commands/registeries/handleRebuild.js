const { handleTerminal } = require('../../common/common.js');

async function handleRebuild() {
  handleTerminal('lando rebuild -y');
}

module.exports = {
  handleRebuild
}
