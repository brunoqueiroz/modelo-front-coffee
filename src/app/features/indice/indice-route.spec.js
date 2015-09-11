'use strict';

describe('indice-route', function(){
  var $rootScope, $state, $injector,$httpBackend,state = 'indice-list';

  beforeEach(module('ui.router'));
  beforeEach(module('sescGso.app.constants'));
  beforeEach(module('sescGso.templates'));
  beforeEach(module('sescGso.app.features.indice'));
  beforeEach(module('redspark.components.breadcrumbs'));

  beforeEach(function() {
    inject(function(_$rootScope_, _$state_, _$injector_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      $state = _$state_;
      $injector = _$injector_;
    });

  });

  afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
  });

  it('Deve ir para o estado de listar', function() {
    $state.go('indice-list');
    $rootScope.$digest();
    expect($state.current.name).toBe(state);
  });

});
