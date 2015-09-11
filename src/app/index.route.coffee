angular.module "modeloFrontCoffee"
  .config ($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise '/'
