module.exports = {
  friendlyName: 'Delete by login',

  description: '',

  inputs: {
    login: { type: 'string', required: true },
    authorization: {
      type: 'string',
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

  fn: async function ({ login, authorization }) {
    const userData = sails.helpers.jwt.verify(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!userData) throw 'notAuthorized';

    const credentials = await Credentials.findOne({ login });

    if (!credentials) {
      throw 'notFound';
    }

    await User.destroyOne({ credentials: credentials.id });
    await Credentials.destroyOne({ id: credentials.id });
  },
};
