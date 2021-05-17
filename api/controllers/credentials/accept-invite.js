module.exports = {
  friendlyName: 'Register',

  description: 'Register credentials.',

  inputs: {
    teammateId: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({ teammateId }) {
    const user = await User.updateOne(
      { teammateId },
      {
        invited: false,
      },
    );

    return { teammateId: user.teammateId, invited: false };
  },
};
