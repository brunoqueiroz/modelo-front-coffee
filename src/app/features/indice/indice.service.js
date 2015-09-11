'use strict';
angular.module('sescGso.app.features.indice.services')
    .factory('IndiceService', function($http, $config) {
        var trataParams = function(page, size, search, sort, direction) {
            var params = {
                page: page,
                size: size,
                search: search,
                sort: sort+','+direction
            };
            return params;
        };
        return {
            getAll: function(page, size, search, sort, direction) {
                return $http({
                    url: $config.APP_BASE_URL + '/indice',
                    method: 'GET',
                    params: trataParams(page, size, search, sort, direction)
                });
            },
            getByAnoAndMes: function(vAno, vMes) {
                return $http({
                    url: $config.APP_BASE_URL + '/indice/',
                    method: 'GET',
                    params: {
                        ano: vAno,
                        mes: vMes
                    }
                }).then(function(indice){
                    return indice.data;
                });
            },
            updateOrCreate: function(indice) {
                if (indice.isNew) {
                    return $http.post($config.APP_BASE_URL + '/indice', indice);
                } else {
                    return $http.put($config.APP_BASE_URL + '/indice', indice);
                }
            }
        };
    });