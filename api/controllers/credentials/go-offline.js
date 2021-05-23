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
      { id: teammateId },
      {
        lastRequest: 0,
      },
    ).fetch();

    return user;
  },
};
