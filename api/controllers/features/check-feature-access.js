module.exports = {
  friendlyName: 'Features',

  description: '',

  inputs: {
    feature: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'query' } },
    },
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

  fn: async function ({ feature, authorization }) {
    const userInfo = sails.helpers.jwt.verify(
      (authorization || this.req.headers.authorization).replace('Bearer ', ''),
    );

    console.log(userInfo);
    if (!userInfo || !userInfo.login) {
      throw 'notAuthorized';
    }

    const credentials = await Credentials.findOne({ login: userInfo.login });
    const user = await User.findOne({ credentials: credentials.id }).populate(
      'role',
    );

    console.log(user);

    const hasAccess = !!user.role.features[feature];

    return { hasAccess };
  },
};
