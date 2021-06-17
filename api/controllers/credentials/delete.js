module.exports = {
  friendlyName: 'Delete',

  description: '',

  inputs: {
    token: { type: 'string', required: true },
  },

  exits: {
    notAuthorized: {
      responseType: 'notAuthorized',
    },
  },

  fn: async function ({ token }) {
    const userData = sails.helpers.jwt.verify(token);

    const credentials = await Credentials.findOne({ login: userData.login });

    if (!credentials) {
      throw 'notAuthorized';
    }

    await User.destroyOne({ credentials: credentials.id });
    await Credentials.destroyOne({ id: credentials.id });
  },
};
