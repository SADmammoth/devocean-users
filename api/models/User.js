module.exports = {
  attributes: {
    teammateId: {
      type: 'string',
      columnType: 'ObjectId',
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
    lastRequest: {
      type: 'number',
    },
    invited: {
      type: 'boolean',
    },
  },
};
