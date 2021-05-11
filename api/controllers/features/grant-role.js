module.exports = {
  friendlyName: 'Features',

  description: '',

  inputs: {
    role: {
      type: 'string',
      required: true,
    },
    login: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({ role, login }) {
    const foundRole = await Role.findOne({
      or: [
        {
          name: role,
        },
        { id: role },
      ],
    });

    if (!foundRole) throw 'badRequest';

    const credentials = await Credentials.findOne({ login });

    if (!credentials) throw 'badRequest';

    const user = await User.updateOne(
      { credentials: credentials.id },
      {
        role: foundRole.id,
      },
    );

    if (!user) throw 'badRequest';

    return { login: user.login, role: user.role };
  },
};
