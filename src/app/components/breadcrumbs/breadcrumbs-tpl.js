'use strict';
angular.module('redspark.components.breadcrumbs.template',[]).run(['$templateCache',
    function($templateCache) {
        $templateCache.put('components/breadcrumbs/breadcrumbs.html',
        '<ul class=\"breadcrumb\">'+
            '<li>'+
                '<ng-switch on=\"breadcrumbs.length === 0\">'+
                    '<span ng-switch-when=\"true\">Página Principal</span>'+
                    '<span ng-switch-default><a ng-href=\"#/\">Página Principal</a></span>'+
                '</ng-switch>'+
            '</li>'+
            '<li ng-repeat=\"breadcrumb in breadcrumbs\">'+
                '<span ng-hide=\"(state.active && !state.abstract) || breadcrumb.hide\" class=\"divider\">»</span>'+
                '<ng-switch on=\"$last\" ng-hide=\"breadcrumb.hide\">'+
                    '<span ng-switch-when=\"true\">{{breadcrumb.path}}</span>'+
                    '<span ng-switch-default>'+
                        '<a ng-if=\"breadcrumb.url\" ng-href=\"#/{{breadcrumb.url}}\">{{breadcrumb.path}}</a>'+
                        '<span ng-if=\"!breadcrumb.url\" ng-bind=\"breadcrumb.path\"></span>'+
                    '</span>'+
                '</ng-switch>'+
            '</li>'+
        '</ul>'+
        '<!-- <span ng-transclude class=\"breadcrumb\"></span> -->');
        }
]);

