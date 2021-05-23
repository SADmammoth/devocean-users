/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  '/': { view: 'swagger-ui' },

  'get /swagger.json': (_, res) => {
    const swaggerJson = require('../swagger/swagger.json');
    if (!swaggerJson) {
      res.status(404).set('content-type', 'application/json').send({
        message: 'Cannot find swagger.json, has the server generated it?',
      });
    }
    return res
      .status(200)
      .set('content-type', 'application/json')
      .send(swaggerJson);
  },

  'post /login': {
    action: 'credentials/login',
  },

  'post /register': {
    action: 'credentials/register',
  },

  'post /checkToken': {
    action: 'credentials/check-token',
  },

  'patch /acceptInvite': {
    action: 'credentials/accept-invite',
  },

  'patch /logout': {
    action: 'credentials/go-offline',
  },

  'post /invite': {
    action: 'credentials/invite',
  },

  'get /access/data': {
    action: 'data-access/check-data-access',
  },

  'post /access/data': {
    action: 'data-access/load-data-access',
  },

  'get /access/feature': {
    action: 'features/check-feature-access',
  },

  'get /access/features': {
    action: 'features/check-features-access',
  },

  'get /access/features/all': {
    action: 'features/get-all',
  },

  'get /access/features/max': {
    action: 'features/get-max-features-by-model',
  },

  'post /access/features': {
    action: 'features/load-features-access',
  },

  'patch /access/features/grant': {
    action: 'features/grant-role',
  },

  'post /dev/faker/creds': {
    action: 'dev/faker/credentials',
  },

  'post /dev/faker/roles': {
    action: 'dev/faker/roles',
  },

  'get /users/:teammateId/status': {
    action: 'users/status',
  },
};
