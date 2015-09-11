// Code here will be linted with JSHint.
/* jshint ignore:start */

'use strict';
angular.module('guideline.gestorAcesso', ['guideline.gestorAcesso.template']).directive('gestorAcesso', [
    '$cookies', '$templateCache',
    function($cookies, $templateCache) {
        return {
            restrict: 'A',
            templateUrl: 'guideline/gestor-acesso/gestor-acesso.html',
            scope: {
                itemLabel: '@',
                usuario: '='
            },
            link: function(scope, element) {
                var urlParam = function() {
                    // This function is anonymous, is executed immediately and 
                    // the return value is assigned to urlParam!
                    var query_string = {};
                    var query = window.location.search.substring(1);
                    var vars = query.split('&');
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split('=');
                        // If first entry with this name
                        if (typeof query_string[pair[0]] === 'undefined') {
                            query_string[pair[0]] = decodeURIComponent(pair[1]);
                            // If second entry with this name
                        } else if (typeof query_string[pair[0]] === 'string') {
                            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                            query_string[pair[0]] = arr;
                            // If third or later entry with this name
                        } else {
                            query_string[pair[0]].push(decodeURIComponent(pair[1]));
                        }
                    }
                    return query_string;
                }();

                // $(window).on('hashchange', function() {
                    // console.log('hashchange'); // Never fired
                    // $('#gestor-acesso-modal').modal('hide');
                // });

                var hasPermission;
                hasPermission = angular.isDefined(scope.user) ? angular.isDefined(scope.user.authorities) ?  _.contains(scope.user.authorities, 'ROLE_COMPONENTE.PERMISSAO') : false:false;
                // hasPermission = user.admin;
                if (hasPermission) {
                    element.one('click', function(e) {
                        var url;
                        e.preventDefault();
                        if (config.APP_BASE_URL_GESTOR_ACESSO) {
                            url = config.APP_BASE_URL_GESTOR_ACESSO;
                        } else {
                            url = window.location.protocol + '//' + (window.location.host.replace('javadev7', 'javadev')) + '/permissao';
                        }
                        url += '/component.jsp?hash=' + urlParam.hash + '&opc_codigo=' + urlParam.opc_codigo + '&permissao=ROLE_COMPONENTE.PERMISSAO';
                        return angular.element('#gestor-acesso-modal').find('iframe').attr('src', url).end();
                    });
                    element.on('click', function() {
                        return $('#gestor-acesso-modal').modal('show');
                    });
                    return angular.element('body').append($templateCache.get('guideline/gestor-acesso/gestor-acesso-modal.html'));
                } else {
                    return element.hide();
                }
            }
        };
    }
]);
// Code here will be ignored by JSHint.
/* jshint ignore:end */