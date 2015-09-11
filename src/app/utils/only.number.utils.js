'use strict';

angular.module('utils.only.number',[])
    .directive('onlyNumber', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }
                return ngModel.$parsers.unshift(function(inputValue) {
                    var digits;
                    digits = inputValue.split('').filter(function(s) {
                        return !isNaN(s) && s !== ' ';
                    }).join('');
                    ngModel.$viewValue = digits;
                    ngModel.$render();
                    return digits;
                });
            }
        };
    });