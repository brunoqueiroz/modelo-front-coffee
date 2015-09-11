'use strict';

xdescribe('breadcrumbs', function() {
    var $compile,
        $rootScope,
        element,
        scope,
        $translate,
        $state,
        $location,
        BreadCrumbService,
        isolado;

    // Load the myApp module, which contains the directive
    beforeEach(module('ui.router'));
    beforeEach(module('sescGso.templates'));
    beforeEach(module('redspark.components.breadcrumbs'));
    beforeEach(module('components.breadcrumbs.service'));
    beforeEach(module('pascalprecht.translate', function($translateProvider) {
        $translateProvider
            .translations('pt_BR', {
                breadcrumb: {
                    'periodo-de-inscricao': 'Periodo de inscrição',
                    'periodo_cadastro': 'Novo Período de inscrição',
                }
            })
        .preferredLanguage('pt_BR');
    }));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, _$translate_, _$state_, _$location_, _BreadCrumbService_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $translate = _$translate_;
        BreadCrumbService = _BreadCrumbService_;
        $state = {
            go: jasmine.createSpy()
        };
        $location = _$location_;
        scope = $rootScope.$new();
        scope.model = {};
        element = $compile('<comp-breadcrumbs></comp-breadcrumbs>')(scope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        isolado = element.isolateScope();
    }));

    it('Deve retornar um array contendo o valor url: "#/periodo-de-inscricao" e path: "Periodo de inscrição"', function() {
        var toState = {
            url: '/periodo-de-inscricao',
            templateUrl: 'app/features/periodo/periodo.list.html',
            controller: 'PeriodoListCtrl',
            name: 'periodo-list'
        };
        spyOn($location, 'path').and.returnValue(toState.url);
        $rootScope.$broadcast('$stateChangeSuccess', toState);

        expect(scope.breadcrumbs).toEqual([{
            'path': 'Periodo de inscrição',
            'url': '#/periodo-de-inscricao'
        }]);
    });

    it('Deve retornar um array contendo e itens e setar o parametro como 2015-1 ', function() {
        var toState = {
            'url': '/periodo-de-inscricao/update/:id',
            'breadcrumbFunction': function() {
                return '/periodo-de-inscricao/$0';
            },
            'name': 'periodo-update'
        };
        BreadCrumbService.params = ['2015-1'];
        spyOn($location, 'path').and.returnValue(toState.url);
        $rootScope.$broadcast('$stateChangeSuccess', toState);

        expect(scope.breadcrumbs).toEqual([{
            'path': 'Periodo de inscrição',
            'url': '#/periodo-de-inscricao'
        }, {
            'path': '2015-1',
            'url': '#/periodo-de-inscricao/2015-1'
        }]);

    });

    it('Deve retornar um array vazio quando url for /', function() {
        var toState = {
            'url': '/periodo-de-inscricao/update/:id',
            'breadcrumbFunction': function() {
                return '/periodo-de-inscricao/$0';
            },
            'name': 'periodo-update'
        };
        BreadCrumbService.params = ['2015-1'];
        spyOn($location, 'path').and.returnValue('/');
        $rootScope.$broadcast('$stateChangeSuccess', toState);

        expect(scope.breadcrumbs).toEqual([]);

    });

});