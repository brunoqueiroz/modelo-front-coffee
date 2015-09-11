'use strict';
angular.module('redspark.components.security.factories')
    .factory('SecurityInterceptorMessages', function($rootScope, $injector, $translate, $log, $noty) {

        var getException;
        getException = function(data) {
            //ControleMensagem no lugar do console...
            if (!angular.isObject(data)) {
                return $translate.instant('exception.erro.generico');
            }
            
            var erro = data.reason || data.mensagem || data.message;
            erro = erro.replace(/\s/g, '').toLowerCase();
            var token = 'exception.' + erro;
            var mensagem = $translate.instant(token);

            if (mensagem === token) {
                $log.warn('Mensagem não associada: #{token}');
                mensagem = $translate.instant('exception.erro.generico');
            }

            return mensagem;
        };

        return {
            apply401: function() {
                $rootScope.configData = {
                    'autenticado': false,
                    'login': null
                };
                var state = $injector.get('$state');
                state.go('login');
                $noty.error($translate.instant('exception.usuario.nao.autenticado'));
            },

            apply400: function() {
                $noty.error($translate.instant('exception.bad.request'));
            },
            apply403: function(rejection) {
                switch (rejection.data) {
                    case 'aplicacao.nao.encontrada':
                        $noty.error($translate.instant('exception.aplicacao.nao.encontrada'));
                        break;
                    case 'usuario.ou.senha.invalidos':
                    case 'Bad credentials':
                        $noty.error($translate.instant('exception.bad.credentials'));
                        break;
                    case 'usuario.desativado':
                        $noty.error($translate.instant('exception.usuario.desativado'));
                        break;
                    default:
                        $noty.error(getException(rejection.data));
                        break;
                }
            },
            apply404: function(rejection) {
                switch (rejection.data.message) {
                    case 'exception.busca.matricula.nao.encontrada':
                        $noty.error($translate.instant('exception.busca.matricula.nao.encontrada'));
                        break;
                    case 'exception.inscricao.nao.encontrada':
                        $noty.error($translate.instant('exception.inscricao.nao.encontrada'));
                        break;
                    default:
                        $noty.error($translate.instant('exception.service.unavailable'));
                        break;
                }
            },
            apply412: function(rejection) {
                $noty.error($translate.instant(rejection.data.message));
            },
            apply500: function() {
                $noty.error($translate.instant('exception.erro.generico'));
            },
            apply502: function() {
                $noty.error($translate.instant('exception.service.unavailable'));
            },
            apply503: function() {
                this.apply503();
            }
        };
    });