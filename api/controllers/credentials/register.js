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
    teammateId: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {},

  fn: async function ({ login, password, teammateId }) {
    const credentials = await Credentials.create({ login, password }).fetch();
    const user = await User.create({
      credentials: credentials.id,
      teammateId: teammateId,
    }).fetch();

    return { teammateId: user.teammateId, login };
  },
};
