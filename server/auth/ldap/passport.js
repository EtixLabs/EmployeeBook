import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import Profil from '../../api/profil/profil.model';
import LdapAuth from 'ldapauth-fork';
import questions from '../../config/questions.js';
import config from '../../config/environment';

function localAuthenticate(User, email, password, done) {
  let ldapConnector = new LdapAuth({
      url: 'ldap://ldap.etixeverywhere.com:389',
      bindDn: 'CN='+config.ldap.user+',CN=Users,CN=EtixEverywhere,DC=domain,DC=local',
      bindCredentials: config.ldap.password,
      searchBase: 'CN=Employees,CN=Users,CN=EtixEverywhere,DC=domain,DC=local',
      searchFilter: '(mail={{username}})'
  });
  ldapConnector.authenticate(email, password, function(err, ldapUser) {
    if (err) {
      if (err.name && err.name === 'InvalidCredentialsError') {
        err = 'Invalid password';
      } else if (typeof err !== 'string') {
        err = 'Unkown error';
      }
      done(null, false, {
        message: err
      });
    }
    // Authentication succeed, check if user is already registered in db
    User.findOneAsync({
      email
    }).then(dbUser => {
      // User not registered, create it
      if (!dbUser) {
        // Create profile first, then user
        return Profil.createAsync({
          email,
          firstName: ldapUser.givenName,
          lastName: ldapUser.sn,
          about: createAboutSection()
        }).then(profile => {
          return User.createAsync({
            email,
            name: profile.firstName + ' ' + profile.lastName,
            slugname: profile.slugs[0]
          });
        });
      } else {
        return dbUser;
      }
    }).then(dbUser => {
      done(null, dbUser);
    }).catch(err => {
      console.log('Error creating a user: ', err);
      done(err);
    });
  });
}

function createAboutSection() {
  return questions.map(q => ({
    question: q,
    answer: ''
  }));
}

exports.setup = function(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
};
