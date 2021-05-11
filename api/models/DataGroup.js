module.exports = {
  attributes: {
    users: {
      collection: 'user',
      via: 'dataGroups',
    },
    dataItems: {
      collection: 'data',
      via: 'dataGroups',
    },
  },
};
