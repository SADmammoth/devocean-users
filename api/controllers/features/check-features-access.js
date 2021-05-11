module.exports = {
  friendlyName: 'Check features access',

  description: '',

  inputs: {
    features: {
      type: 'ref',
      required: true,
      meta: { swagger: { in: 'query' } },
    },
  },

  exits: {},

  fn: async function ({ features }) {
    const allowedFeatures = {
      viewTasks: true,
      manageTasks: true,
      workWithTasks: true,
      viewNotifications: true,
      manageCollections: true,
    };

    console.log(features);

    const result = {};

    features.forEach((feature) => {
      result[feature] = { hasAccess: allowedFeatures[feature] };
    });

    return result;
  },
};
