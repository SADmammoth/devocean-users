const dataAccessLevels = require('../types/enums/dataAccessLevels');

module.exports = {
  attributes: {
    accessLevel: {
      type: 'string',
      isIn: dataAccessLevels,
    },
    dataModel: {
      type: 'string',
      required: true,
    },
    dataItems: {
      type: 'ref',
      required: true,
    },
    dataGroups: {
      collection: 'datagroup',
      via: 'dataItems',
    },
    users: {
      model: 'user',
    },
  },
};
