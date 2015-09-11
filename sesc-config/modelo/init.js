

$(document).ready(function() {
  var request, bootstrapWithLoggedUser, bootstrapWithoutLoggedUser, bootstrap;
  angular.bootstrap(document, ['modeloFrontCoffee']);
  // request = {
  //   type    : 'GET',
  //   url     : window.config.APP_BASE_URL + '/me',
  //   // headers : { 'Authorization': 'Basic c2VzYzpzZXNj' },
  //   headers : { 'Authorization': 'Basic dW5pZGFkZTp1bmlkYWRl' }
  // };

  // bootstrapWithLoggedUser = function(result) {
  //   window.user = result;
  //   bootstrap();
  // }

  // bootstrapWithoutLoggedUser = function() {
  //   window.user = null
  //   bootstrap();
  //   alert('Usuário não esta logado');
  // }

  // bootstrap = function() {
  //   // Bootstrap da aplicação
  //   angular.bootstrap(document, ['modeloFrontCoffee']);
  // }

  // $.ajax(request).success(bootstrapWithLoggedUser).error(bootstrapWithoutLoggedUser);

});