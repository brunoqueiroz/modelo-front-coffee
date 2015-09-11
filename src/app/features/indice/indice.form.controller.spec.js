'use strict';

describe('IndiceFormCtrl', function() {
    var scope;
    var IndiceFormCtrl;
    var template;
    var $state;
    var $httpBackend;
    var $noty;
    var $config;
    var $modalInstance;
    var $bodyModal;

    beforeEach(module('sescGso.app.constants'));
    beforeEach(module('ui.router'));
    beforeEach(module('sescGso.app.features.indice'));
    beforeEach(module('sescGso.templates'));
    beforeEach(module('redspark.components.uiSelectUtils'));

    describe('Adição', function() {
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function($rootScope, $controller, IndiceTranslate, $templateCache, indiceNewMock, _IndiceDateUtils_, _$translate_, $compile, _IndiceService_, _$httpBackend_, _$config_) {
            scope = $rootScope.$new();
            $config = _$config_;

            $httpBackend = _$httpBackend_;

            $state = {
                go: jasmine.createSpy()
            };

            $modalInstance = {
                close: jasmine.createSpy(),
                dismiss: jasmine.createSpy()
            };

            $noty = {
                success: jasmine.createSpy(),
                error: jasmine.createSpy()
            };

            IndiceFormCtrl = $controller('IndiceFormCtrl', {
                $scope: scope,
                $translate: _$translate_,
                $state: $state,
                isNew: true,
                $modalInstance: $modalInstance,
                indice: indiceNewMock,
                IndiceDateUtils: _IndiceDateUtils_,
                $noty: $noty,
                IndiceService: _IndiceService_
            });

            template = $templateCache.get('app/features/indice/indice.form.html');
            var elem = $compile(template)(scope);
            $bodyModal = elem.find('.modal-body');
            scope.$digest();
        }));

        it('Deve inicializar as variaveis corretamente', inject(function() {

            expect(scope.anos).toEqual([{
                'descricao': 1980
            }, {
                'descricao': 1981
            }, {
                'descricao': 1982
            }, {
                'descricao': 1983
            }, {
                'descricao': 1984
            }, {
                'descricao': 1985
            }, {
                'descricao': 1986
            }, {
                'descricao': 1987
            }, {
                'descricao': 1988
            }, {
                'descricao': 1989
            }, {
                'descricao': 1990
            }, {
                'descricao': 1991
            }, {
                'descricao': 1992
            }, {
                'descricao': 1993
            }, {
                'descricao': 1994
            }, {
                'descricao': 1995
            }, {
                'descricao': 1996
            }, {
                'descricao': 1997
            }, {
                'descricao': 1998
            }, {
                'descricao': 1999
            }, {
                'descricao': 2000
            }, {
                'descricao': 2001
            }, {
                'descricao': 2002
            }, {
                'descricao': 2003
            }, {
                'descricao': 2004
            }, {
                'descricao': 2005
            }, {
                'descricao': 2006
            }, {
                'descricao': 2007
            }, {
                'descricao': 2008
            }, {
                'descricao': 2009
            }, {
                'descricao': 2010
            }, {
                'descricao': 2011
            }, {
                'descricao': 2012
            }, {
                'descricao': 2013
            }, {
                'descricao': 2014
            }, {
                'descricao': 2015
            }]);
            expect(scope.meses).toEqual([{
                id: 1,
                descricao: 'Janeiro'
            }, {
                id: 2,
                descricao: 'Fevereiro'
            }, {
                id: 3,
                descricao: 'Março'
            }, {
                id: 4,
                descricao: 'Abril'
            }, {
                id: 5,
                descricao: 'Maio'
            }, {
                id: 6,
                descricao: 'Junho'
            }, {
                id: 7,
                descricao: 'Julho'
            }, {
                id: 8,
                descricao: 'Agosto'
            }, {
                id: 9,
                descricao: 'Setembro'
            }, {
                id: 10,
                descricao: 'Outubro'
            }, {
                id: 11,
                descricao: 'Novembro'
            }, {
                id: 12,
                descricao: 'Dezembro'
            }]);
        }));

        it('Deve ser invalido anoReferencia quando nao estiver definido ', inject(function() {
            scope.indice.anoReferencia = undefined;
            scope.$digest();
            expect(scope.form.ano.$invalid).toBeTruthy();
        }));

        it('Deve ser invalido mesReferencia quando nao estiver definido ', inject(function() {
            scope.indice.mesReferencia = undefined;
            scope.$digest();
            expect(scope.form.mes.$invalid).toBeTruthy();
        }));

        it('Deve ser invalido indcValorAnual quando nao estiver definido ', inject(function() {
            scope.indice.indcValorAnual = undefined;
            scope.$digest();
            expect(scope.form.valorAno.$invalid).toBeTruthy();
        }));

        it('Deve ser invalido indcValorMensal quando nao estiver definido ', inject(function() {
            scope.indice.indcValorMensal = undefined;
            scope.$digest();
            expect(scope.form.valorMes.$invalid).toBeTruthy();
        }));

        it('Deve ser valido o formulario quando todos campos estiverem definidos ', inject(function() {
            scope.indice = {
                anoReferencia: {
                    descricao: 2015
                }
            };

            scope.indice.mesReferencia = {
                id: 2,
                descricao: 'Fevereiro'
            };
            scope.indice.indcValorAnual = 1;
            scope.indice.indcValorMensal = 1;
            scope.$digest();
            expect(scope.form.$valid).toBeTruthy();
        }));

        it('Deve chamar o back para persistir quando salvar', inject(function() {
            scope.indice = {
                anoReferencia: {
                    descricao: 2015
                }
            };

            scope.indice.mesReferencia = {
                id: 2,
                descricao: 'Fevereiro'
            };

            scope.indice.indcValorAnual = 1;
            scope.indice.indcValorMensal = 1;
            scope.$digest();

            // spyOn($modalInstance, 'close').and.returnValue(scope.indice);
            $httpBackend.expectPOST($config.APP_BASE_URL + '/indice', scope.indice).respond(200, {});
            scope.salvar();

            $httpBackend.flush();

            expect(scope.form.$valid).toBeTruthy();
            expect($noty.success).toHaveBeenCalledWith('Indice salvo');
            expect($modalInstance.close).toHaveBeenCalledWith(scope.indice);
        }));

        it('Deve chamar a funca responsavel por fechar o modal', inject(function() {

            scope.cancel();
            scope.$digest();

            expect($modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        }));
    });

    describe('Edição', function() {
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        beforeEach(inject(function($rootScope, $controller, IndiceTranslate, $templateCache, indiceNewMock, _IndiceDateUtils_, _$translate_, $compile, _IndiceService_, _$httpBackend_, _$config_) {
            scope = $rootScope.$new();
            $config = _$config_;

            $httpBackend = _$httpBackend_;

            $state = {
                go: jasmine.createSpy()
            };

            $modalInstance = {
                close: jasmine.createSpy(),
                dismiss: jasmine.createSpy()
            };

            $noty = {
                success: jasmine.createSpy(),
                error: jasmine.createSpy()
            };

            IndiceFormCtrl = $controller('IndiceFormCtrl', {
                $scope: scope,
                $translate: _$translate_,
                $state: $state,
                isNew: false,
                $modalInstance: $modalInstance,
                indice: indiceNewMock,
                IndiceDateUtils: _IndiceDateUtils_,
                $noty: $noty,
                IndiceService: _IndiceService_
            });

            template = $templateCache.get('app/features/indice/indice.form.html');
            var elem = $compile(template)(scope);
            $bodyModal = elem.find('.modal-body');
            scope.$digest();
        }));

        it('Deve chamar o back para persistir quando salvar', inject(function() {
            scope.indice = {
                anoReferencia: {
                    descricao: 2015
                }
            };

            scope.indice.mesReferencia = {
                id: 2,
                descricao: 'Fevereiro'
            };

            scope.indice.indcValorAnual = 1;
            scope.indice.indcValorMensal = 1;
            scope.$digest();

            // spyOn($modalInstance, 'close').and.returnValue(scope.indice);
            $httpBackend.expectPUT($config.APP_BASE_URL + '/indice', scope.indice).respond(200, {});
            scope.salvar();

            $httpBackend.flush();

            expect(scope.form.$valid).toBeTruthy();
            expect($noty.success).toHaveBeenCalledWith('Indice salvo');
            expect($modalInstance.close).toHaveBeenCalledWith(scope.indice);
        }));
    });
});