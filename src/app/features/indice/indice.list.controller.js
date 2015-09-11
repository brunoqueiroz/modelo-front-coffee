'use strict';

angular.module('sescGso.app.features.indice.controllers')
    .controller('IndiceListCtrl', function($scope, $state, $modal, $noty, IndiceService, DataTableUtils, IndiceDateUtils) {

        $scope.adicionar = function() {

            var modalCreate = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/features/indice/indice.form.html',
                controller: 'IndiceFormCtrl',
                resolve: {
                    indice: function() {
                        return undefined;
                    },
                    isNew: function(){
                        return true;
                    }
                }
            });
            modalCreate.result.then(function() {
                $state.go($state.current, {}, {
                    reload: true
                });
            });
        };

        $scope.editar = function(ano, mes) {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'app/features/indice/indice.form.html',
                controller: 'IndiceFormCtrl',
                resolve: {
                    indice: ['IndiceService', function(IndiceService) {
                        return IndiceService.getByAnoAndMes(ano, mes);
                    }],
                    isNew: function(){
                        return false;
                    }
                }
            });

            modalInstance.result.then(function() {
                $scope.refTable._fnReDraw();
            });
        };

        var columns = [{
            title: 'Ano',
            index: 'id.anoReferencia',
            formatter: function(row) {
                return '<a class="link-collumn">'+row.anoReferencia+'</a>';
            }
        }, {
            index: 'id.mesReferencia',
            title: 'Mês',
            formatter: function(row) {
                return IndiceDateUtils.getLabelMonth(row.mesReferencia);
            }
        }, {
            index: 'indcValorMensal',
            title: 'INCC Valor Mês'
        }, {
            index: 'indcValorAnual',
            title: 'INCC do ano'
        }];

        $scope.options = {
            config: {
                aaSorting: [0, 'asc'],
                aoColumnDefs: [{
                    bVisible: false,
                    aTargets: []
                }],
                bPaginate: true,
                bProcessing: true,
                bServerSide: true,
                bSort: true,
                fnServerData: function(sSource, oaData, fnCallback, oSettings) {
                    return DataTableUtils.fnServerData(sSource, oaData, fnCallback, oSettings, IndiceService.getAll, $scope.filtro, columns, $scope.options);
                }
            },
            linkCollumn: function(row, ref) {
                $scope.refTable = ref;
                $scope.editar(row.anoReferencia, row.mesReferencia);
            },
            columns: columns
        };
    });