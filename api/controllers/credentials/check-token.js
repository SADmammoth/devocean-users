module.exports = {
  friendlyName: 'Check token',

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

    const user = await User.findOne({ credentials: credentials.id });

    return user;
  },
};
