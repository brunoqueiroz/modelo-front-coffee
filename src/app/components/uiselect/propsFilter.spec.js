'use strict';

describe('PropsFilter', function() {
    describe('EchoService', function() {
        beforeEach(module('redspark.components.uiSelectUtils'));

        it('Deve retornar todos os itens', inject(function($filter) {
            var categorias = [{
                'id': 1,
                'descricao': 'Comerciário'
            }, {
                'id': 2,
                'descricao': 'Servidor SESC'
            }];
            var prop = {
                'descricao': ''
            };
            var out = $filter('propsFilter')(categorias, prop);

            expect(out).toEqual(categorias);

        }));

        it('Deve retornar apenas um item que possui a descricao "Servidor SESC"', inject(function($filter) {
            var categorias = [{
                'id': 1,
                'descricao': 'Comerciário'
            }, {
                'id': 2,
                'descricao': 'Servidor SESC'
            }];
            var prop = {
                'descricao': 'Servidor'
            };
            var out = $filter('propsFilter')(categorias, prop);
            var outExpected = [{
                'id': 2,
                'descricao': 'Servidor SESC'
            }];

            expect(out).toEqual(outExpected);

        }));

        it('Não deve executar filtro quando entrada nao é um array', inject(function($filter) {
            var categorias = {
                'id': 2,
                'descricao': 'Servidor SESC'
            };
            var prop = {
                'descricao': 'Servidor'
            };
            var out = $filter('propsFilter')(categorias, prop);

            expect(out).toEqual(categorias);

        }));
    });
});