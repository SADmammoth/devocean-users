const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify',

  description: 'Verify jwt.',

  sync: true,

  inputs: {
    token: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ token }) {
    return jwt.verify(token, sails.config.custom.jwtSecret);
  },
};
