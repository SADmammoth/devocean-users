module.exports = {
  friendlyName: 'Register',

  description: 'Register credentials.',

  inputs: {
    login: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    password: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    teammateId: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    role: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
    workspaceId: {
      type: 'string',
    },
  },

  exits: {
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({
    login,
    password,
    teammateId,
    role = 'User',
    workspaceId,
  }) {
    const foundRole = await Role.findOne({
      or: [{ name: role }, { id: role }],
    });
    if (!foundRole) throw 'badRequest';

    const credentials = await Credentials.create({
      login,
      password,
    }).fetch();

    const workspace = await Workspace.findOne({ id: workspaceId });

    const user = await User.create({
      credentials: credentials.id,
      teammateId: teammateId,
      invited: true,
      role: foundRole.id,
      workspaceId: workspace.id,
    }).fetch();

    return {
      teammateId: user.teammateId,
      login,
      invited: true,
      workspaceId: workspace.id,
    };
  },
};
