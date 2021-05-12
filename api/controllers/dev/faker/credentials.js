module.exports = {
  friendlyName: 'Credentials',

  description: 'Credentials faker.',

  inputs: {
    count: {
      type: 'number',
      defaultsTo: 1,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ count }) {
    const array = new Array(count).fill(0).map(() => {
      return {
        login: sails.helpers.faker.login(),
        password: sails.helpers.faker.password(),
      };
    });

    const creds = await Credentials.createEach(array).fetch();
    return creds;
  },
};
