'use strict';

angular.module('sescGso.app.features.indice.controllers')
    .controller('IndiceFormCtrl', function($scope, $noty, $state, $translate, $modalInstance, indice,isNew, IndiceService,IndiceDateUtils) {

        $scope.indice = indice;
        $scope.anos = IndiceDateUtils.getArrayYears(1980);
        $scope.meses = IndiceDateUtils.getArrayMonths();

        $scope.expandModal = function() {
            $('.modal-body').css('height', '300px');
        };

        if (angular.isDefined(indice)) {
            $scope.indice.anoReferencia = {
                descricao: indice.anoReferencia
            };
            $scope.indice.mesReferencia = {
                id: indice.mesReferencia,
                descricao: moment(indice.mesReferencia).format('MMMM')
            };
        } else {
            $scope.indice = {
                anoReferencia: {
                    descricao: moment().year()
                }
            };

            $scope.indice.mesReferencia = {
                id: moment().format('M'),
                descricao: moment().format('MMMM')
            };
        }


        $scope.salvar = function() {
            if ($scope.form.$valid) {
                var indice = $scope.indice;
                indice.anoReferencia = $scope.indice.anoReferencia.descricao;
                indice.mesReferencia = $scope.indice.mesReferencia.id;
                indice.isNew = isNew;

                IndiceService.updateOrCreate(indice).then(function() {
                    $noty.success($translate.instant('indice.INDICE_SALVO'));
                    $modalInstance.close($scope.indice);
                });
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });