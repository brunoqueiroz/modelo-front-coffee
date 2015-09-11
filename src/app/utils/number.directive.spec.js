'use strict';

describe('Number Utils', function() {
    var $compile,
        $rootScope,
        element,
        scope,
        ctrl,
        isolado;

    // Load the myApp module, which contains the directive
    beforeEach(module('sescGso.templates'));
    beforeEach(module('utils.number'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching

        $compile = _$compile_;
        $rootScope = _$rootScope_;

        scope = $rootScope.$new();
        scope.model = {};
        element = $compile('<input type="text" ng-model="model" number-min="10" number-max="20">')(scope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        isolado = element.isolateScope();

        ctrl = element.controller('ngModel');

    }));

    it('Deve iniciar o componente corretamente', function() {
    	//ngModel is required
        expect(isolado.model).toEqual({});
    });

    it('Deve ser valido quando o model for maior que o number-min e menor que number-max', function() {
    	scope.model = 15;
    	scope.$digest();
        expect(isolado.model).toEqual(15);
        expect(ctrl.$valid).toEqual(true);
    });

    it('Deve ser inválido quando model for menor que number-min', function() {
    	scope.model = 9;
    	scope.$digest();
        expect(isolado.model).toEqual(9);
        expect(ctrl.$error.numbermin).toEqual(true);
    });

    it('Deve ser invalido quando o model for maior que o number-max', function() {
    	scope.model = 22;
    	scope.$digest();
        expect(isolado.model).toEqual(22);
        expect(ctrl.$error.numbermax).toEqual(true);
    });
});