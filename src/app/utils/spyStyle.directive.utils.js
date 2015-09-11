'use strict';

angular.module('utils.spystyle', [])
    .directive('spyStyle', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                scope.$watch(function() {
                    return element.attr('class');
                }, function(newValue) {
                    console.log(newValue);
                });
            }
        };
    });