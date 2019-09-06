const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test', //dont have to login for our test
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://carlitos.auth0.com/.well-known/jwks.json'
  }),
  audience: 'eB4y1r8SKX126QIKiaBCytl5uSFwm3Qb',
  issuer: 'https://carlitos.auth0.com',
  algorithms: ['RS256']
});
