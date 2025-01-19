var context;

/**
 * Set context.
 * @param {*} ctx 
 */
function set(ctx) {
  context = ctx;
}

/**
 * Get context.
 * @returns context
 */
function get() {
  return context;
}

module.exports = {
  set,
  get,
}

