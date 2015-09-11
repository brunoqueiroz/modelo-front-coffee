'use strict';

describe('Filtro params utils', function() {
    var UtilsFiltroParamsService;

    beforeEach(module('utils.filtro.params'));

    beforeEach(inject(function(_UtilsFiltroParamsService_) {
        UtilsFiltroParamsService = _UtilsFiltroParamsService_;

    }));

    it('Deve retornar undefined quando objeto for null', function() {
        var filtro = null;
        var result = UtilsFiltroParamsService.getParam(filtro);

        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined quando objeto for undefined', function() {
        var filtro;
        var result = UtilsFiltroParamsService.getParam(filtro);

        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined quando objeto for setado mas param nao existir no objeto', function() {
        var filtro = {
            id: 1
        };

        var result = UtilsFiltroParamsService.getParam(filtro, 'nome');

        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined quando objeto for setado mas e o param passado for null', function() {
        var filtro = {
            id: null
        };

        var result = UtilsFiltroParamsService.getParam(filtro, 'id');

        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined quando objeto for setado mas e o param passado for undefined', function() {
        var filtro = {
            id: undefined
        };

        var result = UtilsFiltroParamsService.getParam(filtro, 'id');

        expect(result).toBeUndefined();
    });

    it('Deve retornar 2 quando objeto for setado e o para informado existir no objeto', function() {
        var filtro = {
            id: 2
        };

        var result = UtilsFiltroParamsService.getParam(filtro, 'id');

        expect(result).toBe(2);
    });

    it('Deve retornar 10 quando objeto for setado e o para informado existir no objeto', function() {
        var filtro = {
            unidade: {
                id: 10
            }
        };

        var result = UtilsFiltroParamsService.getParam(filtro, 'unidade', 'id');

        expect(result).toBe(10);
    });

    it('Deve retornar undefined quando objeto for setado e o para informado não existir no objeto', function() {
        var filtro = {
            unidade: {
                id: 10
            }
        };

        var result = UtilsFiltroParamsService.getParam(filtro, 'unidade', 'nome');

        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined quando objeto for setado e o para informado não existir no objeto e for null', function() {
        var filtro = {
            unidade: {
                id: null
            }
        };

        var result = UtilsFiltroParamsService.getParam(filtro, 'unidade', 'id');

        expect(result).toBeUndefined();
    });

    it('Deve retornar undefined quando objeto for setado e o para informado não existir no objeto e for null', function() {
        var filtro = {
            unidade: {
                id: undefined
            }
        };

        var result = UtilsFiltroParamsService.getParam(filtro, 'unidade', 'id');

        expect(result).toBeUndefined();
    });
});