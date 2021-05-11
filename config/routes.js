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

  'post /access/features': {
    action: 'features/load-features-access',
  },

  'post /dev/faker/creds': {
    action: 'dev/faker/credentials',
  },

  'post /dev/faker/roles': {
    action: 'dev/faker/roles',
  },
};
