'use strict';
angular.module('utils.filtro.params', [])
    .factory('UtilsFiltroParamsService', function() {
        return {
            getParam: function(object, nivel1, nivel2) {
                if (nivel2) {
                    if (_.has(object, nivel1) && _.has(object[nivel1], nivel2) && object[nivel1][nivel2]) {
                        return object[nivel1][nivel2];
                    }
                    return undefined;
                }
                if (_.has(object, nivel1) && object[nivel1]) {
                    return object[nivel1];
                }
                return undefined;
            }
        };
    });