module.exports = {
  friendlyName: 'Register',

  description: 'Register credentials.',

  inputs: {
    login: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    password: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {},

  fn: async function ({ login, password }) {
    const credentials = await Credentials.create({ login, password });
    return { message: `${login} registered` };
  },
};
