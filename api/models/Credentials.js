module.exports = {
  attributes: {
    login: {
      type: 'string',
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      encrypt: true,
      required: true,
    },
  },
};
