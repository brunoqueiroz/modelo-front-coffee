'use strict';

xdescribe('Datatables  service', function() {
    var $rootScope,
        scope,
        DataTableUtils,
        PeriodoService,
        oSettings,
        $httpBackend,
        $config;

    // Load the myApp module, which contains the directive
    beforeEach(module('redspark.app.constants'));
    beforeEach(module('guideline.datatables.service'));
    beforeEach(module('redspark.app.features.periodo.services'));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, _DataTableUtils_, _PeriodoService_, _$httpBackend_, _$config_) {
        $httpBackend = _$httpBackend_;
        $config = _$config_;
        oSettings = {};
        oSettings.aaSorting = [
            [0, 'asc', 0]
        ];
        //oSettings.oInstance.fnSettings().oPreviousSearch.sSearch
        oSettings.oInstance = {
            fnSettings: function() {
                return {
                    oPreviousSearch: {
                        sSearch: 'busca'
                    }

                };
            }
        };

        oSettings.iDraw = 1;

        oSettings._iDisplayStart = 0;
        oSettings._iDisplayLength = 10;

        $rootScope = _$rootScope_;

        DataTableUtils = _DataTableUtils_;
        PeriodoService = _PeriodoService_;

        scope = $rootScope.$new();
        scope.filtro = {
            de: '',
            ate: '',
            situacao: ''
        };

        scope.options = {
            'config': {
                'actionButtons': true,
                'inspectButton': true,
                'deleteButton': false,
                'aaSorting': [0, 'asc'],
                'aoColumnDefs': [{
                    'bVisible': false,
                    'aTargets': []
                }],
                'bPaginate': true,
                'bProcessing': true,
                'bServerSide': true,
                'bSort': true
            },
            'columns': [{
                'title': 'Identificação',
                'index': 'identificacao',
                '$$hashKey': 'object:26'
            }, {
                'index': 'inicioInscricao',
                'title': 'Iniçio Inscrição',
                '$$hashKey': 'object:27'
            }, {
                'index': 'fimInscricao',
                'title': 'Fim Inscrição',
                '$$hashKey': 'object:28'
            }, {
                'title': 'Situação',
                'index': 'situacao',
                '$$hashKey': 'object:29'
            }, {
                'index': 'validadeInscricao',
                'title': 'Validade Inscrição',
                '$$hashKey': 'object:30'
            }, {
                'title': 'Ações',
                '$$hashKey': 'object:31'
            }]
        };

        scope.$apply();

    }));

    it('Testeeeeee', function() {

        var result = {
            'content': [{
                'id': 1,
                'identificacao': '2015-1',
                'inicioInscricao': '06/05/2015',
                'fimInscricao': '08/05/2015',
                'validadeInscricao': '26/05/2015',
                'renovacao': 12,
                'situacao': 'A',
                'categorias': [{
                    'id': 1,
                    'descricao': 'categoria 1',
                    'percentual': 25
                }, {
                    'id': 2,
                    'descricao': 'categoria 2',
                    'percentual': 25
                }, {
                    'id': 3,
                    'descricao': 'categoria 3',
                    'percentual': 25
                }, {
                    'id': 4,
                    'descricao': 'categoria 4',
                    'percentual': 25
                }],
                'unidades': [{
                    'id': 1,
                    'nome': null,
                    'sigla': null
                }, {
                    'id': 5,
                    'nome': null,
                    'sigla': null
                }]
            }],
            'last': true,
            'totalElements': 1,
            'totalPages': 1,
            'sort': [{
                'direction': 'ASC',
                'property': 'identificacao',
                'ignoreCase': false,
                'nullHandling': 'NATIVE',
                'ascending': true
            }],
            'first': true,
            'numberOfElements': 1,
            'size': 10,
            'number': 0
        };

        var expected = {
            'aaData': [
                ['2015-1', '06/05/2015', '08/05/2015', 'Ativa', '26/05/2015', ' ']
            ],
            'iTotalRecords': 1,
            'iTotalDisplayRecords': 1,
            'sEcho': 1
        };

        $httpBackend.expectGET($config.APP_BASE_URL + '/periodoInscricao?direction=asc&page=0&search=&size=10&sort=identificacao').respond(result, 200);

        var fnCallback = jasmine.createSpy('fnCallback');

        var oaData = [{
            'name': 'sEcho',
            'value': 1
        }, {
            'name': 'iColumns',
            'value': 6
        }, {
            'name': 'sColumns',
            'value': ''
        }, {
            'name': 'iDisplayStart',
            'value': 0
        }, {
            'name': 'iDisplayLength',
            'value': 10
        }, {
            'name': 'mDataProp_0',
            'value': 0
        }, {
            'name': 'mDataProp_1',
            'value': 1
        }, {
            'name': 'mDataProp_2',
            'value': 2
        }, {
            'name': 'mDataProp_3',
            'value': 3
        }, {
            'name': 'mDataProp_4',
            'value': 4
        }, {
            'name': 'mDataProp_5',
            'value': 5
        }, {
            'name': 'sSearch',
            'value': ''
        }, {
            'name': 'bRegex',
            'value': false
        }, {
            'name': 'sSearch_0',
            'value': ''
        }, {
            'name': 'bRegex_0',
            'value': false
        }, {
            'name': 'bSearchable_0',
            'value': true
        }, {
            'name': 'sSearch_1',
            'value': ''
        }, {
            'name': 'bRegex_1',
            'value': false
        }, {
            'name': 'bSearchable_1',
            'value': true
        }, {
            'name': 'sSearch_2',
            'value': ''
        }, {
            'name': 'bRegex_2',
            'value': false
        }, {
            'name': 'bSearchable_2',
            'value': true
        }, {
            'name': 'sSearch_3',
            'value': ''
        }, {
            'name': 'bRegex_3',
            'value': false
        }, {
            'name': 'bSearchable_3',
            'value': true
        }, {
            'name': 'sSearch_4',
            'value': ''
        }, {
            'name': 'bRegex_4',
            'value': false
        }, {
            'name': 'bSearchable_4',
            'value': true
        }, {
            'name': 'sSearch_5',
            'value': ''
        }, {
            'name': 'bRegex_5',
            'value': false
        }, {
            'name': 'bSearchable_5',
            'value': true
        }, {
            'name': 'iSortCol_0',
            'value': 0
        }, {
            'name': 'sSortDir_0',
            'value': 'asc'
        }, {
            'name': 'iSortingCols',
            'value': 1
        }, {
            'name': 'bSortable_0',
            'value': true
        }, {
            'name': 'bSortable_1',
            'value': true
        }, {
            'name': 'bSortable_2',
            'value': true
        }, {
            'name': 'bSortable_3',
            'value': true
        }, {
            'name': 'bSortable_4',
            'value': true
        }, {
            'name': 'bSortable_5',
            'value': true
        }];

        var columns = [{
            title: 'Identificação',
            index: 'identificacao'
        }, {
            index: 'inicioInscricao',
            title: 'Iniçio Inscrição'
        }, {
            index: 'fimInscricao',
            title: 'Fim Inscrição'
        }, {
            title: 'Situação',
            index: 'situacao',
        }, {
            index: 'validadeInscricao',
            title: 'Validade Inscrição'
        }, {
            title: 'Ações',
            formatter: function() {
                return ' ';
            }
        }];
        
        DataTableUtils.fnServerData(null, oaData, fnCallback, oSettings, PeriodoService.getAll, scope.filtro, columns, scope.options);
        $httpBackend.flush();

        expect(fnCallback).toHaveBeenCalledWith(expected);

    });

});