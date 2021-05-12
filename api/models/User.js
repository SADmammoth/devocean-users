module.exports = {
  attributes: {
    teammateId: {
      type: 'string',
      unique: true,
    },
    role: {
      model: 'role',
    },
    dataGroups: {
      collection: 'datagroup',
      via: 'users',
    },
    credentials: {
      model: 'credentials',
    },
  },
};
