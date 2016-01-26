(function() {
  'use strict';

  angular
    .module('spark', [
      'ngCookies',
      //'ngTouch',
      'ngSanitize',
      'ngMessages',
      'restangular',
      'ui.router',
      'ngMaterial',
      'ngMdIcons',
      'LocalStorageModule',
      'pascalprecht.translate',
      'RecursionHelper',
      angularDragula(angular),
      'toastr',
      'formly',
      'formlyMaterial'
    ]);

})();
