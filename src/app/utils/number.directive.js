'use strict';

angular.module('utils.number', [])
    .directive('numberMin', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel',
                numberMin: '=',
                numberMax: '='
            },
            link: function(scope, elm, attrs, ngModel) {
                scope.$watch('model', function() {
                    scope.validaMinMax();
                });

                scope.$watch('numberMin', function() {
                    scope.validaMinMax();
                });

                scope.$watch('numberMax', function() {
                    scope.validaMinMax();
                });

                scope.validaMinMax = function() {
                    ngModel.$setValidity('numbermin', true);
                    ngModel.$setValidity('numbermax', true);

                    if (parseInt(scope.model) < parseInt(scope.numberMin)) {
                        ngModel.$setValidity('numbermin', false);
                    } else {
                        ngModel.$setValidity('numbermin', true);
                    }

                    if (parseInt(scope.model) > parseInt(scope.numberMax)) {
                        ngModel.$setValidity('numbermax', false);
                    } else {
                        ngModel.$setValidity('numbermax', true);
                    }
                };
            }
        };
    });