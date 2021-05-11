const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Sign',

  description: 'Sign jwt.',

  sync: true,

  inputs: {
    payload: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ payload }) {
    return jwt.sign(payload, sails.config.custom.jwtSecret);
  },
};
