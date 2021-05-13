module.exports = {
  friendlyName: 'Login',

  description: 'Login credentials.',

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

  exits: {
    notFound: {
      responseType: 'notFound',
    },
    notAuthorized: {
      responseType: 'notAuthorized',
    },
  },

  fn: async function ({ login, password }) {
    const credentials = await Credentials.findOne({ login }).decrypt();
    if (!credentials) {
      throw 'notFound';
    }

    const passwordCheck = credentials.password === password;

    if (!passwordCheck) {
      throw 'notAuthorized';
    }

    const user = await User.findOne({ credentials: credentials.id });

    if (!user) {
      await Credentials.destroyOne({ login });

      throw 'notAuthorized';
    }

    return sails.helpers.jwt.sign({ login, teammateId: user.teammateId });
  },
};
