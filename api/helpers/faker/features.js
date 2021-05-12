const { random } = require('faker');

module.exports = {
  friendlyName: 'Features',

  description: 'Features faker.',

  sync: true,

  inputs: {},

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function () {
    const taskFeatures = ['manageTasks', 'workWithTasks', 'viewTasks'];
    const notificationsFeatures = ['manageNotifications', 'viewNotifications'];
    const collectionsFeatures = ['manageCollections'];

    const result = [];

    result.push(random.arrayElement(taskFeatures));
    result.push(random.arrayElement(notificationsFeatures));
    result.push(random.arrayElement(collectionsFeatures));

    let features;

    result.forEach((feature) => {
      return (features = {
        ...features,
        ...sails.helpers.addFeatureAccess(feature),
      });
    });

    return features;
  },
};
