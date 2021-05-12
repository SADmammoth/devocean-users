const features = require('../types/enums/features');

module.exports = {
  friendlyName: 'Add feature access',

  description: '',

  sync: true,

  inputs: {
    feature: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ feature }) {
    let modifier;
    const modifiers = ['manage', 'workWith', 'view'];
    if (feature.startsWith('manage')) {
      modifier = 0;
    }
    if (feature.startsWith('workWith')) {
      modifier = 1;
    }
    if (feature.startsWith('view')) {
      modifier = 2;
    }

    const model = feature.split(modifiers[modifier])[1];

    const notAllowedFeatures = modifiers;
    const allowedFeatures = notAllowedFeatures.splice(modifier);

    return Object.fromEntries([
      // ...notAllowedFeatures.map((modifier) => {
      //   return [modifier + model, false];
      // }),
      ...allowedFeatures.map((modifier) => {
        return [modifier + model, true];
      }),
    ]);
  },
};
