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
    if (Date.now() - user.lastRequest < 360000) {
      return { status: 'online' };
    }

    return { status: 'offline' };
  },
};
