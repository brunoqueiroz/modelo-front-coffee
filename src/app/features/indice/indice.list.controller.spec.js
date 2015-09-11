'use strict';

describe('IndiceListCtrl', function() {
    var scope;
    var IndiceListCtrl;
    var template;
    var $state;
    var $httpBackend;
    var $noty;
    var $config;
    var fakeModal = {
        result: {
            then: function(callback) {
                callback();
            }
        }
    };


    beforeEach(module('sescGso.app.constants'));
    beforeEach(module('ui.router'));
    beforeEach(module('sescGso.app.features.indice'));
    beforeEach(module('sescGso.templates'));
    beforeEach(module('redspark.components.uiSelectUtils'));
    beforeEach(module('guideline.datatables'));
    beforeEach(module('ui.bootstrap.modal'));
    beforeEach(module('guideline.components.notification'));

    describe('Listar - Entrada das popups', function() {

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function($rootScope, $modal, $controller, $templateCache, $compile, _$httpBackend_, _$config_, DataTableUtils, _IndiceService_, _IndiceDateUtils_) {
            scope = $rootScope.$new();
            $config = _$config_;

            $httpBackend = _$httpBackend_;

            $state = {
                go: jasmine.createSpy()
            };

            $noty = {
                success: jasmine.createSpy(),
                error: jasmine.createSpy()
            };

            IndiceListCtrl = $controller('IndiceListCtrl', {
                $scope: scope,
                $state: $state,
                $modal: $modal,
                $noty: $noty,
                IndiceService: _IndiceService_,
                DataTableUtils: DataTableUtils,
                IndiceDateUtils: _IndiceDateUtils_
            });

            template = $templateCache.get('app/features/indice/indice.list.html');
            $compile(template)(scope);
            scope.$digest();
        }));

        it('Não deve chamar o serviço para buscar o indice quando for uma adição',function() {
            $state.current = 'indice-list';
             //necessário mockar para abrir a modal
            $httpBackend.whenGET('template/modal/backdrop.html').respond('<div></div>');
            $httpBackend.whenGET('template/modal/window.html').respond('<div></div>');
            scope.adicionar();
            $httpBackend.flush();
           
        });

        it('Deve chamar o serviço para buscar o indice quando for uma edição', function() {
            $state.current = 'indice-list';
            
            var configDataTable = {
                _fnReDraw: jasmine.createSpy()
            };
            var row = {
                anoReferencia: 2015,
                mesReferencia: 2
            };

            var response = {
                indcValorAnual: 123,
                indcValorMensal: 123,
                mesReferencia: 2, 
                anoReferencia: 2015
            };

            //necessário mockar para abrir a modal
            $httpBackend.whenGET('template/modal/backdrop.html').respond('<div></div>');
            $httpBackend.whenGET('template/modal/window.html').respond('<div></div>');

            $httpBackend.expectGET($config.APP_BASE_URL + '/indice/?ano=2015&mes=2').respond(response);
            scope.options.linkCollumn(row, configDataTable);
            $httpBackend.flush();
        });



    });


    describe('Listar - Retornos das popups', function() {

        beforeEach(inject(function($modal) {
            spyOn($modal, 'open').and.returnValue(fakeModal);
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function($rootScope, $modal, $controller, $templateCache, $compile, _$httpBackend_, _$config_, DataTableUtils, _IndiceService_, _IndiceDateUtils_) {
            scope = $rootScope.$new();
            $config = _$config_;

            $httpBackend = _$httpBackend_;

            $state = {
                go: jasmine.createSpy()
            };

            $noty = {
                success: jasmine.createSpy(),
                error: jasmine.createSpy()
            };

            IndiceListCtrl = $controller('IndiceListCtrl', {
                $scope: scope,
                $state: $state,
                $modal: $modal,
                $noty: $noty,
                IndiceService: _IndiceService_,
                DataTableUtils: DataTableUtils,
                IndiceDateUtils: _IndiceDateUtils_
            });

            template = $templateCache.get('app/features/indice/indice.list.html');
            $compile(template)(scope);
            scope.$digest();
        }));

        it('Deve recarregar a tela quando um indice for adicionado',function() {
            $state.current = 'indice-list';
            scope.adicionar();
            expect($state.go).toHaveBeenCalledWith($state.current, {}, {
                reload: true
            });
        });

        it('Deve recarregar a tela quando um indice for adicionado',function() {
            $state.current = 'indice-list';
            scope.refTable = {
                _fnReDraw: function() {}
            };
            spyOn(scope.refTable, '_fnReDraw');
            scope.editar();
            expect(scope.refTable._fnReDraw).toHaveBeenCalled();
        });

        it('Deve chamar o DataTableUtils.fnServerData para carregar o grid', inject( function(DataTableUtils) {
            spyOn(DataTableUtils, 'fnServerData');
            scope.options.config.fnServerData();
            expect(DataTableUtils.fnServerData).toHaveBeenCalled();
        }));

        it('Deve chamar a edição passando o ano e mes de referencia indicados', inject( function(DataTableUtils) {
            var configDataTable = {
                _fnReDraw: jasmine.createSpy()
            };
            var row = {
                anoReferencia: 2015,
                mesReferencia: 2
            };
            spyOn(DataTableUtils, 'fnServerData');
            scope.options.linkCollumn(row, configDataTable);
            scope.editar();
            expect(scope.refTable._fnReDraw).toHaveBeenCalled();
        }));

        it('Deve formatar o ano no datagrid corretamente', function() {
            var column = _.findWhere(scope.options.columns, {
                index: 'id.anoReferencia'
            });
            var row = {
                anoReferencia: 2015,
                mesReferencia: 2
            };
            expect(column.formatter(row)).toBe('<a class="link-collumn">2015</a>');
        });

        it('Deve formatar o mês no datagrid corretamente', function() {
            var column = _.findWhere(scope.options.columns, {
                index: 'id.mesReferencia'
            });
            var row = {
                anoReferencia: 2015,
                mesReferencia: 2
            };
            expect(column.formatter(row)).toBe('Fevereiro');
        });

        it('Deve formatar o mês no datagrid corretamente', function() {
            var column = _.findWhere(scope.options.columns, {
                index: 'id.mesReferencia'
            });
            var row = {
                anoReferencia: 2015,
                mesReferencia: 14
            };
            expect(column.formatter(row)).toBe('Mês inválido');
        });




    });
});