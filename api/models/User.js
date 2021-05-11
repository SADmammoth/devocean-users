module.exports = {
  attributes: {
    teammateId: {
      type: 'string',
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
