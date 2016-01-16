(function() {
  'use strict';

  angular
    .module('spark')
    .run(runBlock);

  /** @ngInject */
  function runBlock ( $rootScope, $state, $stateParams, $log, Restangular, modelManager, authorization ) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      // track the state the user wants to go to; authorization service needs this
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;
      // if the principal is resolved, do an authorization check immediately. otherwise,
      // it'll be done when the state it resolved.
      if (principal.isIdentityResolved()) authorization.authorize();
    });

    // Extending Restangular endpoints with corresponding models
    Restangular.extendModel('projects', function (obj) {
      return angular.extend(obj, modelManager.ProjectModel);
    });

    Restangular.extendModel('questionnaires', function (obj) {
      return angular.extend(obj, modelManager.QuestionnaireModel);
    });

    $log.debug('runBlock end');
  }

})();
