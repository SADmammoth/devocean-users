module.exports = {
  friendlyName: 'Check data access',

  description: '',

  inputs: {
    accessSubject: {
      type: 'string',
      required: true,
      description: 'User or data group id',
    },
    model: {
      type: 'string',
      required: true,
    },
    dataItem: {
      type: 'string',
      required: true,
    },
  },

  exits: {},

  fn: async function ({ model, dataItem, accessSubject }) {
    // All done.
    return;
  },
};
