angular.module "modeloFrontCoffee"
  .config ($logProvider, toastr,$urlRouterProvider,$translateProvider) ->
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $urlRouterProvider.otherwise('/');
    #httpMethodInterceptorProvider.whitelistDomain('/');
    # Enable log
    $logProvider.debugEnabled true
    # Set options third-party lib
    toastr.options.timeOut = 3000
    toastr.options.positionClass = 'toast-top-right'
    toastr.options.preventDuplicates = true
    toastr.options.progressBar = true
