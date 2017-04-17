'use strict';

/* DEPENDENCIES */
const crypto = require('crypto');

/* EXPORTS GENERATE FUNCTION */
exports.generate = (options, returnFunction) => {
  let defaults = {
    length: 6,
    chars: 'ABCDEFGHIJKLMNPQRSTUWXYZ123456789',
    separator: '-',
    groups: 1
  };
  let config = {};

  if (typeof options === 'number') options = { length: options };

  config = Object.assign(defaults, options);

  // RETURN VALUE OR FUNCTION
  if (returnFunction) {
    return function() {
      return generateId(config);
    };
  } else {
    return generateId(config);
  }
};

/* HELPER FUNCTIONS */
function generateId(options) {
  let value = new Array(options.length);
  let random = crypto.randomBytes(options.length);
  for (let i = 0; i < options.length; i++) {
    value[i] = options.chars[random[i] % options.chars.length];
  }
  return value.join('');
}
