module.exports = {
  friendlyName: 'Features',

  description: '',

  inputs: {
    authorization: {
      type: 'string',
      meta: { swagger: { in: 'query' } },
    },
  },

  exits: {
    notAuthorized: {
      responseType: 'notAuthorized',
    },
  },

  fn: async function ({ authorization }) {
    const userInfo = sails.helpers.jwt.verify(
      (authorization || this.req.headers.authorization).replace('Bearer ', ''),
    );

    if (!userInfo || !userInfo.login) {
      throw 'notAuthorized';
    }

    const credentials = await Credentials.findOne({ login: userInfo.login });
    const user = await User.findOne({ credentials: credentials.id }).populate(
      'role',
    );

    if (!user) throw 'notAuthorized';

    return Object.fromEntries(
      Object.entries(
        sails.helpers.getMaxAccessForModel(user.role.features),
      ).map(([key, value]) => [key, { hasAccess: value }]),
    );
  },
};
