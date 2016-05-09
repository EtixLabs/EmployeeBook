(function(angular, undefined) {
'use strict';

angular.module('etixbookApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],ldap:{}})

;
})(angular);