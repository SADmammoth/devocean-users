module.exports = {
  friendlyName: 'User',

  description: 'Get user status',

  inputs: {
    teammateId: { type: 'string', required: true },
  },

  exits: {
    notAuthorized: {
      responseType: 'notAuthorized',
    },
  },

  fn: async function ({ teammateId }) {
    const user = await User.findOne({ teammateId });
    if (!user) return;
    const requestDiff = 30000;
    if (Date.now() - user.lastRequest < requestDiff) {
      return { status: 'online' };
    }

    return { status: 'offline' };
  },
};
