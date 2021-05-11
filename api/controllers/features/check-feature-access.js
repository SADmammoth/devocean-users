module.exports = {
  friendlyName: 'Check feature access',

  description: '',

  inputs: {
    feature: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'query' } },
    },
  },

  exits: {},

  fn: async function ({ feature }) {
    const features = {
      viewTasks: true,
      manageTasks: true,
      workWithTasks: true,
      viewNotifications: true,
      manageCollections: true,
    };

    return { hasAccess: features[feature] };
  },
};
