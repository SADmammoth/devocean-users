module.exports = {
  friendlyName: 'Get max access for model',

  description: '',

  sync: true,

  inputs: {
    features: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Max access for model',
    },
  },

  fn: function ({ features }) {
    const maxFeaturesForModel = {};
    const modifiers = ['manage', 'workWith', 'view'];

    Object.entries(features).forEach(([feature, value]) => {
      if (!value) return;

      let modifier;

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
      if (
        maxFeaturesForModel[model] === undefined ||
        maxFeaturesForModel[model] > modifier
      ) {
        maxFeaturesForModel[model] = modifier;
      }
    });

    return Object.fromEntries(
      Object.entries(maxFeaturesForModel).map(([model, feature]) => {
        return [modifiers[feature] + model, true];
      }),
    );
  },
};
