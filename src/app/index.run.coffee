angular.module "modeloFrontCoffee"
  .run ($log,$rootScope,$locale) ->
    $log.debug 'runBlock end'
    $rootScope.userLogged = window.user;
    #configurando dados da mascara de dinheiro
    $locale.NUMBER_FORMATS.DECIMAL_SEP = ',';
    $locale.NUMBER_FORMATS.GROUP_SEP = '.';
    $locale.NUMBER_FORMATS.CURRENCY_SYM = ' ';
