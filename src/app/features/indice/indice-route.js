'use strict';

angular.module('sescGso.app.features.indice.controllers', []);
angular.module('sescGso.app.features.indice.services', []);

angular.module('sescGso.app.features.indice', [
        'sescGso.app.features.indice.controllers',
        'sescGso.app.features.indice.services',
        'utils.filtro.params', 'pascalprecht.translate', 'guideline.datatables.service'
    ])
    .config(function($stateProvider, $translateProvider, IndiceTranslateProvider) {
        $translateProvider
            .translations('pt_BR', IndiceTranslateProvider.pt_BR())
            .preferredLanguage('pt_BR');

        $stateProvider
            .state('indice-list', {
                url: '/indices',
                templateUrl: 'app/features/indice/indice.list.html',
                controller: 'IndiceListCtrl'
            });
    });