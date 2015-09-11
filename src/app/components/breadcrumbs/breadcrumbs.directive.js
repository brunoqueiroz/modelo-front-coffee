'use strict';

angular.module('redspark.components.breadcrumbs', ['components.breadcrumbs.service','redspark.components.breadcrumbs.template'])
    .directive('rsBreadcrumbs', function($rootScope, $location, $translate, BreadCrumbService) {
        return {
            restrict: 'E',
            templateUrl: 'components/breadcrumbs/breadcrumbs.html',
            link: function(scope) {
                $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                    if (angular.isDefined(toState.breadcrumbs)) {
                        scope.breadcrumbs = angular.copy(toState.breadcrumbs);
                        
                        _.each(scope.breadcrumbs, function(breadcrumb){
                            _.each(BreadCrumbService.params, function(param){
                                if(breadcrumb[param.field] === param.chave){
                                    if(angular.isDefined(param.hide)){
                                        breadcrumb.hide = param.hide;
                                    }
                                    breadcrumb[param.field] = param.value;
                                }
                            });
                        });
                    } else {
                        var paths;
                        if ($location.path() === '/') {
                            scope.breadcrumbs = [];
                        } else {
                            paths = $location.path().split('/').slice(1);
                        }

                        scope.breadcrumbs = _.map(paths, function(path, index) {
                            var nome = $translate.instant('breadcrumb.' + path).replace('breadcrumb.', '');
                            return {
                                path: nome,
                                url: (paths.slice(0, +index + 1 || 9e9).join('/'))
                            };
                        });
                    }
                });
            }
        };
    });