'use strict';
angular.module('utils.permissao', [])
    .factory('PermissaoService', function($rootScope) {
        return {
            hasPermissao: function(role) {
                return _.contains($rootScope.userLogged.authorities, role);
            }
        };
    });