'use strict';

angular.module('utils.maxlength', [])
    .directive('myMaxlength', function($log) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                attrs.$set('ngTrim', 'false');
                var maxlength = parseInt(attrs.myMaxlength, 10);
                if(!angular.isDefined(attrs.hideInfo)){
                    var elementInfo =  angular.element('<label>Restam <span id="qtdRestante">'+maxlength+'</span> caracteres</label>');
                    elementInfo.insertAfter(elem);
                }
                ctrl.$parsers.push(function(value) {
                    $log.info("In parser function value = [" + value + "].");
                    $('#qtdRestante').html(maxlength-value.length);
                    if (value.length > maxlength) {
                        $log.info("The value [" + value + "] is too long!");
                        value = value.substr(0, maxlength);
                        ctrl.$setViewValue(value);
                        ctrl.$render();
                        $log.info("The value is now truncated as [" + value + "].");
                    }
                    return value;
                });
            }
        };
    });