module.exports = {
  friendlyName: 'Check token',

  description: '',

  inputs: {
    token: { type: 'string', required: true },
  },

  exits: {},

  fn: async function ({ token }) {
    return sails.helpers.jwt.verify(token);
  },
};
