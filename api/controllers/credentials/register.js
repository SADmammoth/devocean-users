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
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    role: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({ login, password, teammateId, role }) {
    const foundRole = await Role.fondOne({
      or: [{ name: role }, { id: role }],
    });
    if (!foundRole) throw 'badRequest';

    const credentials = await Credentials.create({
      login,
      password,
      role: foundRole,
    }).fetch();
    const user = await User.create({
      credentials: credentials.id,
      teammateId: teammateId,
    }).fetch();

    return { teammateId: user.teammateId, login };
  },
};
