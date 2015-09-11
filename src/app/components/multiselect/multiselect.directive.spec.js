'use strict';

describe('Unit testing great quotes', function() {
    var $compile,
        $rootScope,
        element,
        scope,
        unidadesOdontologia,
        isolado;

    // Load the myApp module, which contains the directive
    beforeEach(module('sescGso.templates'));
    beforeEach(module('redspark.components.multiselect'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching

        unidadesOdontologia = [{
            'id': 1,
            'nome': 'PRESIDÊNCIA  E CONSELHO REGIONAL',
            'sigla': 'PRESIDÊNCIA',
            'especialidade': 'odontologia'
        }, {
            'id': 2,
            'nome': 'DIRETORIA REGIONAL',
            'sigla': 'DIREG',
            'especialidade': 'odontologia'
        }, {
            'id': 10,
            'nome': 'SUPERINTENDÊNCIA DE ADMINISTRAÇÃO',
            'sigla': 'SA',
            'especialidade': 'odontologia'
        }, {
            'id': 5,
            'nome': 'SUPERINTENDÊNCIA DE COMUNICAÇÃO SOCIAL',
            'sigla': 'SCS',
            'especialidade': 'odontologia'
        }];

        $compile = _$compile_;
        $rootScope = _$rootScope_;

        scope = $rootScope.$new();
        scope.odontos = angular.copy(unidadesOdontologia);
        scope.unidades = {};
        scope.unidades.selecionadas = [];
        element = $compile('<comp-multi-select ng-model="unidades.selecionadas" avaliable="odontos" selected-label="Unidades Selecionadas" avaliable-label="Unidades Disponiveis" display-attr="sigla"></comp-multi-select>')(scope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        isolado = element.isolateScope();

    }));

    it('Deve iniciar o componente corretamente', function() {
        expect(_.size(isolado.avaliable)).toBe(_.size(unidadesOdontologia));
        expect(isolado.selectedLabel).toBe('Unidades Selecionadas');
        expect(isolado.avaliableLabel).toBe('Unidades Disponiveis');
        expect(isolado.selected).toEqual({
            'avaliable': [],
            'model': []
        });
        expect(isolado.model).toEqual([]);
    });

    xit('Deve selecionar dois itens para o unidades selecionadas e manter dois itens no disponíveis', function() {
        isolado.avaliable[0].selected = true;
        isolado.avaliable[1].selected = true;
        isolado.$digest();
        isolado.add();
        expect(_.size(isolado.avaliable)).toBe(2);
        expect(_.size(isolado.model)).toBe(2);
        isolado.$digest();
    });

    xit('Deve remover a seleção dos itens não visivéis quando o filtro "SUPERINTENDÊNCIA" for aplicado', function() {
        isolado.avaliable[0].selected = true;
        isolado.avaliable[1].selected = true;
        isolado.avaliable[2].selected = true;
        isolado.avaliable[3].selected = true;
        isolado.avaliableSearch = 'SUPERINTENDÊNCIA';
        isolado.$digest();

        var result = _.filter(isolado.avaliable, function(a) {
            return a.selected;
        });
        expect(_.size(result)).toBe(2);
    });

    xit('Deve enviar dois itens para o selecionadas e voltar para a unidades disponíveis', function() {
        isolado.avaliable[0].selected = true;
        isolado.avaliable[1].selected = true;
        scope.$digest();
        isolado.add();
        scope.$digest();
        expect(_.size(isolado.model)).toBe(2);

        isolado.model[0].selected = true;
        isolado.model[1].selected = true;
        scope.$digest();
        isolado.remove();
        scope.$digest();
        expect(_.size(isolado.model)).toBe(0);
        expect(_.size(isolado.avaliable)).toBe(4);

    });

    it('Deve selecionar todos elementos', function() {

        isolado.checkAll(isolado.avaliable, '', true);
        isolado.$digest();
        var result = _.filter(isolado.avaliable, function(a) {
            return a.selected;
        });
        expect(_.size(result)).toBe(4);
    });




});