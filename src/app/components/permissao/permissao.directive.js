'use strict';

angular.module('redspark.components.permissao', [])
    .directive('hasPermissao', function(PermissaoService) {
        return {
            restrict: 'A',
            replace: false,
            link: function(scope, element, attrs) {
                if (PermissaoService.hasPermissao(attrs.hasPermissao)) {
                    element.show();
                } else {
                    element.hide();
                }
            }
        };
    });