'use strict';

describe('Header', function() {
    var $compile,
        $rootScope,
        element,
        scope,
        isolado;

    // Load the myApp module, which contains the directive
    beforeEach(module('sescGso.templates'));
    beforeEach(module('redspark.components.header'));
    beforeEach(module('utils.permissao'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.userLogged = {
            admin: true,
            authorities: [
                'ROLE_PERIODOINSCRICAO.LISTAR',
                'ROLE_PERIODOINSCRICAO.CRIAR',
                'ROLE_PERIODOINSCRICAO.EDITAR',
                'ROLE_PERIODOINSCRICAO.SUSPENDER',

                'ROLE_PERIODOAVALIACAO.LISTAR',
                'ROLE_PERIODOAVALIACAO.CRIAR',
                'ROLE_PERIODOAVALIACAO.EDITAR',

                'ROLE_INSCRICAO.INSCRITOS.LISTAR',
                'ROLE_INSCRICAO.INSCRITOS.EDITAR',
                'ROLE_INSCRICAO.CRIAR',
                'ROLE_INSCRICAO.EDITAR',

                'ROLE_AVALIACAO.LISTAR',
                'ROLE_AVALIACAO.EDITAR',
                'ROLE_AVALIACAO.CHAMAR',

                'ROLE_AGENDAMENTO.LISTAR',
                'ROLE_AGENDAMENTO.EDITAR',
                'ROLE_AGENDAMENTO.CANCELAR',

                'ROLE_TRATAMENTO.LISTAR',
                'ROLE_TRATAMENTO.EDITAR',
                'ROLE_TRATAMENTO.ENVIAR',
                'ROLE_TRATAMENTO.ENVIAR',

                'ROLE_CURUMINS.LISTAR',
                'ROLE_CURUMINS.EDITAR',
                'ROLE_CURUMINS.INSCREVER',

                'ROLE_INSCRITO.AVALIAR',
                'ROLE_INSCRITO.CHAMAR',
                'ROLE_INSCRITO.AGENDAR',
                'ROLE_INSCRITO.LIBERAR.AVALIACAO'
            ]
        };
        scope = $rootScope.$new();
        scope.model = {};
        element = $compile('<div comp-header></div>')(scope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        isolado = element.isolateScope();

        scope.menuItems = [{
            state: 'periodos',
            label: 'Períodos',
            childrens: [{
                state: 'periodo-list',
                label: 'Período de inscrição'
            }, {
                state: 'periodo-create',
                label: 'Novo período de inscrição'
            }, {
                state: 'avaliacao-list',
                label: 'Período de avaliação'
            }, {
                state: 'avaliacao-create',
                label: 'Novo período de avaliação'
            }, ]
        }, {
            state: 'inscricao',
            label: 'Inscrições',
            childrens: [{
                state: 'inscritos-list',
                label: 'Inscritos'
            }, ]
        }, ];
    }));

    it('Deve iniciar o componente corretamente', function() {
        var menuItemsExpect = [{
            state: 'periodos',
            label: 'Períodos',
            childrens: [{
                state: 'periodo-list',
                label: 'Período de inscrição'
            }, {
                state: 'periodo-create',
                label: 'Novo período de inscrição'
            }, {
                state: 'avaliacao-list',
                label: 'Período de avaliação'
            }, {
                state: 'avaliacao-create',
                label: 'Novo período de avaliação'
            }, ]
        }, {
            state: 'inscricao',
            label: 'Inscrições',
            childrens: [{
                state: 'inscritos-list',
                label: 'Inscritos'
            }, ]
        }, ];
        expect(scope.menuItems).toEqual(menuItemsExpect);
    });

    it('Deve retornar "" quando não existir filhos no menu', function() {
        var menuItems = [{
            state: 'periodos',
            label: 'Períodos',
        }, {
            state: 'inscricao',
            label: 'Inscrições',
        }, ];
        scope.menuItems = menuItems;
        scope.$digest();
        expect(scope.returnClassWhenHasChildrens()).toEqual('');
    });
});