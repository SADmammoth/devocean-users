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
    role: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {
    badRequest: {
      responseType: 'badRequest',
    },
    notUnique: { responseType: 'notUnique' },
  },

  fn: async function ({ login, password, teammateId, role = 'Admin' }) {
    const foundRole = await Role.findOne({
      or: [{ name: role }, { id: role }],
    });
    if (!foundRole) throw 'badRequest';

    const credentials = await Credentials.create({
      login,
      password,
    })
      .intercept((err) => {
        if (err.code === 'E_UNIQUE') {
          return {
            notUnique: 'User already exists',
          };
        }
        return err;
      })
      .fetch();

    const user = await User.create({
      credentials: credentials.id,
      teammateId: teammateId,
      role: foundRole.id,
    }).fetch();

    return { teammateId: user.teammateId, login };
  },
};
