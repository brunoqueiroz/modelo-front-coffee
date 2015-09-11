'use strict';

angular.module('redspark.components.security.factories', ['guideline.components.notification']);

angular.module('redspark.components.security', ['redspark.components.security.factories', 'pascalprecht.translate'])
  .config(function ($stateProvider,$translateProvider,$httpProvider,SecurityTranslateProvider) {
    
    $translateProvider
      .translations('pt_BR', SecurityTranslateProvider.pt_BR());

    $httpProvider.interceptors.push('SecurityInterceptor');
    
});
