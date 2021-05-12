module.exports = {
  friendlyName: 'Roles',

  description: 'Roles faker.',

  inputs: {
    name: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ name }) {
    return await Role.create({
      name,
      features: sails.helpers.faker.features(),
    }).fetch();
  },
};
