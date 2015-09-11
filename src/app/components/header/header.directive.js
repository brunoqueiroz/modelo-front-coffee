'use strict';

angular.module('redspark.components.header', [])
    .directive('compHeader', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'app/components/header/header.html',
            link: function(scope) {
                scope.menuItems = [{
                    state: 'processo-list',
                    label: 'Processos',
                    // visible: PermissaoService.hasPermissao('ROLE_PERIODOINSCRICAO.LISTAR')
                    visible: true
                    // childrens: [{
                    //     state: 'periodo-list',
                    //     label: 'Período de inscrição',
                    //     visible: PermissaoService.hasPermissao('ROLE_PERIODOINSCRICAO.LISTAR')
                    // }, {
                    //     state: 'avaliacao-list',
                    //     label: 'Período de avaliação',
                    //     visible: PermissaoService.hasPermissao('ROLE_PERIODOAVALIACAO.LISTAR')
                    // }]
                },{
                    state: 'indice-list',
                    label: 'Índices',
                    visible: true
                }];

                scope.returnClassWhenHasChildrens = function(elem, className) {
                    if (angular.isDefined(elem)) {
                        return className;
                    }
                    return '';

                };
            }
        };
    });