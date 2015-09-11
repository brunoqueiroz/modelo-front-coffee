angular.module('modeloFrontCoffee.components', [
  'redspark.components.header',
  'redspark.components.breadcrumbs',
  'redspark.components.security',
  'redspark.components.multiselect',
  'guideline.datatables',
  'guideline.components.notification',
  'guideline.gestorAcesso',
  'guideline.components.datepicker',
  'redspark.components.permissao',
  'redspark.components.uiSelectUtils',
  'utils.permissao',
  'utils.maxlength'
]);



angular.module('modeloFrontCoffee.features', [
    'modeloFrontCoffee.features.main',
    'sescGso.app.features.indice'
]);

angular.module 'modeloFrontCoffee', ['ngAnimate', 
  'ngCookies', 
  'ngTouch', 
  'ngSanitize', 
  'ui.router', 
  'ui.bootstrap',
  'modeloFrontCoffee.components',
  'modeloFrontCoffee.features'
]
  
  
