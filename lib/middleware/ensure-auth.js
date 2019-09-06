const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://carlitos.auth0.com/.well-known/jwks.json'
  })
});

