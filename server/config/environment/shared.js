'use strict';

exports = module.exports = {
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],
  ldap: {
    user: process.env.ETIX_LDAP_USER,
    password: process.env.ETIX_LDAP_PASSWORD
  }
};
