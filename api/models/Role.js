module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    features: {
      type: 'ref',
      required: true,
    },
    users: {
      collection: 'user',
      via: 'role',
    },
  },
};
