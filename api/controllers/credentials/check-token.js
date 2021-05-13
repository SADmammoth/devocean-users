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

    const credentials = await Credentials.count({ login: userData.login });

    if (!credentials) {
      throw 'notAuthorized';
    }

    return userData;
  },
};
