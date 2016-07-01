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
      'md.data.table',
      'angular-medium-editor',
      'validation.match',
      'ngMdIcons',
      'LocalStorageModule',
      'pascalprecht.translate',
      'RecursionHelper',
      angularDragula(angular),
      'toastr',
      'ngFileUpload',
      'gridster',
      'nvd3',
      'ivh.treeview'
    ]);

})();
