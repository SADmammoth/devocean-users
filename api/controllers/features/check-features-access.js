module.exports = {
  friendlyName: 'Features',

  description: '',

  inputs: {
    features: {
      type: 'ref',
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

  fn: async function ({ features, authorization }) {
    const userInfo = sails.helpers.jwt.verify(
      (authorization || this.req.headers.authorization).replace('bearer ', ''),
    );
    if (!userInfo || !userInfo.login) {
      throw 'notAuthorized';
    }

    const credentials = await Credentials.findOne({ login: userInfo.login });
    const user = await User.findOne({ credentials: credentials.id }).populate(
      'role',
    );

    const result = {};

    if (typeof features === 'string') {
      features = features.split(',');
    }

    features.forEach((feature) => {
      result[feature] = { hasAccess: !!user.role.features[feature] };
    });

    return result;
  },
};
