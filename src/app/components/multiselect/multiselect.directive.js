'use strict';

angular.module('redspark.components.multiselect', [])
    .directive('compMultiSelect', function($q, $filter) {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                selectedLabel: '@',
                avaliableLabel: '@',
                displayAttr: '@',
                avaliable: '=',
                model: '=ngModel',
                submmited: '=',
                lazyFind: '&',
                disableInicio: '='
            },
            templateUrl: 'components/multiselect/multiselect.html',
            link: function(scope, elm, attrs, ngModel) {
                // console.log('diretiva id:', scope.$id);
                scope.selected = {
                    avaliable: [],
                    model: []
                };

                scope.clickFind = function(value) {
                    scope.lazyFind({
                        search: value
                    });
                };

                scope.filterFunctionSearch = function(search) {
                    return function(item) {
                        if (!_.size(search)) {
                            return true;
                        }
                        if (angular.isUndefined(item[scope.displayAttr])) {
                            return false;
                        }
                        return item[scope.displayAttr].toUpperCase().indexOf(search.toUpperCase()) !== -1;
                    };
                };

                var watcherProvider = function(checkbox, provider, search, aux) {
                    if (angular.isDefined(scope.lazyFind)) {
                        scope.selected[aux] = _.filter(provider, function(value) {
                            return value.selected;
                        });

                        scope[checkbox] = _.size(provider) === _.size(scope.selected[aux]) && _.size(provider) > 0;
                    } else {
                        scope.selected[aux] = _.filter(provider, function(value) {
                            return value.selected;
                        });

                        scope[checkbox] = _.size(scope.filtro(provider, search)) === _.size(scope.selected[aux]) && _.size(scope.filtro(provider, search)) > 0;
                    }

                };

                var removeUnidadesFirstProviderExistSecondProvider = function(array1, array2) {
                    var filtrado = _.reject(array1, function(item) {
                        return existItemArray(array2, item);
                    });
                    scope.avaliable = filtrado;
                };

                var watcherSearch = function(checkbox, provider, search, aux) {
                    var filterAtual = $filter('filter')(scope.selected[aux], search);

                    var itensOutFilterAtual = _.filter(scope.selected[aux], function(a) {
                        return !_.contains(filterAtual, a);
                    });

                    scope[checkbox] = _.size(scope.filtro(provider, search)) === _.size(scope.selected[aux]) && _.size(scope.filtro(provider, search)) > 0;

                    return _.map(itensOutFilterAtual, function(p) {
                        p.selected = false;
                    });

                };

                var existItemArray = function(array, item) {
                    var encontrado = false;

                    _.each(array, function(value) {
                        if (value.cnpj === item.cnpj) {
                            encontrado = true;
                        }
                    });

                    return encontrado;
                };

                /* Filters out items in original that are also in toFilter. Compares by reference. */
                var filterOut = function(original, toFilter) {
                    var filtered = [];
                    angular.forEach(original, function(entity) {
                        var match = false;
                        entity.selected = false;
                        for (var i = 0; i < toFilter.length; i++) {
                            if (toFilter[i][attrs.displayAttr] === entity[attrs.displayAttr]) {
                                match = true;
                                break;
                            }
                        }
                        if (!match) {
                            filtered.push(entity);
                        }
                    });
                    return filtered;
                };

                scope.$watch('avaliable', function(newValue) {
                    removeUnidadesFirstProviderExistSecondProvider(scope.avaliable, scope.model);
                    watcherProvider('checkAllAvaliable', newValue, scope.avaliableSearch, 'avaliable');
                }, true);

                scope.$watch('model', function(newValue) {
                    watcherProvider('checkAllModel', newValue, scope.modelSearch, 'model');
                    if (_.size(scope.model) === 0) {
                        ngModel.$setValidity('validModel', false);
                    } else {
                        ngModel.$setValidity('validModel', true);
                    }
                    removeUnidadesFirstProviderExistSecondProvider(scope.avaliable, scope.model);
                }, true);

                scope.$watch('avaliableSearch', function(newValue) {
                    if (angular.isDefined(scope.lazyFind)) {
                        return false;
                    }
                    return watcherSearch('checkAllAvaliable', scope.avaliable, newValue, 'avaliable');
                });

                scope.$watch('modelSearch', function(newValue) {
                    return watcherSearch('checkAllModel', scope.model, newValue, 'model');
                });



                scope.filtro = function(array, search) {
                    return $filter('filter')(array, {
                        'sigla': search
                    });
                };

                scope.checkAll = function(array, search, hasChecked) {
                    if (angular.isDefined(scope.lazyFind)) {
                        return _.map(array, function(value) {
                            value.selected = hasChecked;
                        });
                    } else {
                        return _.map(scope.filtro(array, search), function(value) {
                            value.selected = hasChecked;
                        });
                    }
                };

                scope.refreshAvaliable = function() {
                    scope.avaliable = filterOut(scope.avaliable, scope.model);
                    scope.selected.avaliable = [];
                    scope.selected.model = [];
                    scope.avaliableSearch = '';
                    scope.modelSearch = '';
                    scope.checkAllModel = false;
                    scope.checkAllAvaliable = false;
                };

                scope.add = function() {
                    $('.tooltip').hide();

                    _.each(scope.selected.avaliable, function(selecionado) {
                        if (!existItemArray(scope.model, selecionado)) {
                            scope.model = scope.model.concat(selecionado);
                        }else{

                        }
                    });
                    if (!angular.isDefined(scope.lazyFind)) {
                        scope.refreshAvaliable();
                    }
                };
                scope.remove = function() {
                    $('.tooltip').hide();
                    scope.model = filterOut(scope.model, scope.selected.model);

                    _.each(scope.selected.model, function(selecionado) {
                        if (!existItemArray(scope.avaliable, selecionado)) {
                            scope.avaliable = scope.avaliable.concat(selecionado);
                        }
                    });

                    if (!angular.isDefined(scope.lazyFind)) {
                        scope.refreshAvaliable();
                    }
                };
            }
        };
    });