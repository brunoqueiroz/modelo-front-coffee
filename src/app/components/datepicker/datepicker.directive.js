'use strict';

angular.module('guideline.components.datepicker', [])
    .constant('datepickerOptions', {
        defaultDate: '+1w',
        changeMonth: true,
        changeYear: true
    })
    .directive('datepickerGuideline', ['$timeout', 'datepickerOptions', function($timeout, datepickerOptions) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel',
                dataMinima: '=datepickerMinDate',
                dataMaxima: '=datepickerMaxDate',
                disabled: '=ngDisabled',
                makeUnique: '=',
                minDateBlock: '='
            },
            template: '<input class="input-small" ng-model="model" ng-disabled="disabled" mask="date" type="text"/>',
            link: function(scope, element, attrs, ngModel) {

                var datepickerElement = element.find('input[type=text]')[0];

                scope.$watch('dataMinima', function() {
                    scope.validaIntervalo();
                });

                scope.$watch('dataMaxima', function() {
                    scope.validaIntervalo();
                });

                scope.$watch('model', function() {
                    if (!scope.validaData(ngModel.$modelValue)) {
                        ngModel.$setValidity('dateinvalid', false);
                    } else {
                        ngModel.$setValidity('dateinvalid', true);
                    }
                    scope.validaIntervalo();
                });

                scope.$watch('makeUnique', function(newValue) {
                    if (scope.model !== '' && scope.model) {
                        if (_.size(_.filter(newValue, function(dia) {
                                return dia.data === scope.model;
                            })) > 1) {
                            ngModel.$setValidity('dateIsNotUnique', false);
                        } else {
                            ngModel.$setValidity('dateIsNotUnique', true);
                        }
                    }
                }, true);

                scope.validaIntervalo = function() {
                    if (_.size(scope.dataMaxima) && _.size(scope.model)) {
                        if (moment(scope.dataMaxima, 'DD/MM/YYYY') < moment('' + scope.model, 'DD/MM/YYYY')) {
                            ngModel.$setValidity('maxdateinvalid', false);
                        } else {
                            ngModel.$setValidity('maxdateinvalid', true);
                        }
                    } else {
                        ngModel.$setValidity('maxdateinvalid', true);
                    }
                    if (_.size(scope.dataMinima) && _.size(scope.model)) {
                        if (moment(scope.dataMinima, 'DD/MM/YYYY') > moment('' + scope.model, 'DD/MM/YYYY')) {
                            ngModel.$setValidity('mindateinvalid', false);
                        } else {
                            ngModel.$setValidity('mindateinvalid', true);
                        }
                    } else {
                        ngModel.$setValidity('mindateinvalid', true);
                    }
                };

                /******** VALIDA DATA NO FORMATO DD/MM/AAAA *******/
                scope.validaData = function(stringData) {
                    if (stringData) {
                        var regExpCaracter = /[^\d]/; //Expressão regular para procurar caracter não-numérico.
                        var regExpEspaco = /^\s+|\s+$/g; //Expressão regular para retirar espaços em branco.

                        if (stringData.length !== 10) {
                            return false;
                        }

                        var splitData = stringData.split('/');

                        if (splitData.length !== 3) {
                            return false;
                        }

                        /* Retira os espaços em branco do início e fim de cada string. */
                        splitData[0] = splitData[0].replace(regExpEspaco, '');
                        splitData[1] = splitData[1].replace(regExpEspaco, '');
                        splitData[2] = splitData[2].replace(regExpEspaco, '');

                        if ((splitData[0].length !== 2) || (splitData[1].length !== 2) || (splitData[2].length !== 4)) {
                            return false;
                        }

                        /* Procura por caracter não-numérico. EX.: o 'x' em '28/09/2x11' */
                        if (regExpCaracter.test(splitData[0]) || regExpCaracter.test(splitData[1]) || regExpCaracter.test(splitData[2])) {
                            return false;
                        }

                        var dia = parseInt(splitData[0], 10);
                        var mes = parseInt(splitData[1], 10) - 1; //O JavaScript representa o mês de 0 a 11 (0->janeiro, 1->fevereiro... 11->dezembro)
                        var ano = parseInt(splitData[2], 10);

                        var novaData = new Date(ano, mes, dia);

                        /* O JavaScript aceita criar datas com, por exemplo, mês=14, porém a cada 12 meses mais um ano é acrescentado à data
                             final e o restante representa o mês. O mesmo ocorre para os dias, sendo maior que o número de dias do mês em
                             questão o JavaScript o converterá para meses/anos.
                             Por exemplo, a data 28/14/2011 (que seria o comando 'new Date(2011,13,28)', pois o mês é representado de 0 a 11)
                             o JavaScript converterá para 28/02/2012.
                             Dessa forma, se o dia, mês ou ano da data resultante do comando 'new Date()' for diferente do dia, mês e ano da
                             data que está sendo testada esta data é inválida. */
                        if ((novaData.getDate() !== dia) || (novaData.getMonth() !== mes) || (novaData.getFullYear() !== ano)) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                };

                return $(datepickerElement).datepicker($.extend(datepickerOptions, {
                    onSelect: function(selectedDate) {
                        return $timeout(function() {
                            return ngModel.$setViewValue(selectedDate);
                        });
                    }
                }));
            }
        };
    }]);