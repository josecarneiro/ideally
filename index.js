'use strict';

/* DEPENDENCIES */
const { randomBytes } = require('crypto');
const { promisify, callbackify } = require('util');

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNPQRSTUWXYZ123456789'; // 24 CHARS + 9 NUMBERS
const DEFAULTS = {
  length: 6,
  chars: DEFAULT_CHARS,
  separator: '-',
  groups: 1
};
const copyObject = object => JSON.parse(JSON.stringify(object));

/* EXPORTS GENERATE FUNCTION */
exports.generate = (options, callback) => {
  if (!options) options = {};
  if (typeof options === 'number') options = { length: options };
  if (callback) options.asyncronous = true;
  options = Object.assign(copyObject(DEFAULTS), options);

  // RETURN VALUE OR FUNCTION
  if (options.function) {
    return () => generateSyncronous(options);
  } else if (options.asyncronous && callback) {
    return callbackify(generateAsyncronous)(options, callback);
  } else if (options.asyncronous) {
    return generateAsyncronous(options);
  } else {
    return generateSyncronous(options);
  }
};

/* HELPER FUNCTIONS */
function generateSyncronous ({ length, chars }) {
  let random = randomBytes(length);
  return bytesToId(random, { length, chars });
}

async function generateAsyncronous ({ length, chars }) {
  try {
    const random = await promisify(randomBytes)(length);
    return bytesToId(random, { length, chars });
  } catch (error) {
    throw error;
  }
}

function bytesToId (bytes, { length, chars }) {
  return new Array(length)
  .fill()
  .map((value, index) => chars[bytes[index] % chars.length])
  .join('');
}
