(function() {
  'use strict';

  angular
    .module('spark')
    .run(runBlock);

  /** @ngInject */
  function runBlock ( $rootScope, $state, $stateParams, $log, formlyConfig, Restangular, modelManager, authorization, principal ) {

    formlyConfig.setType({
      name: 'checkbox-list',
      templateUrl: 'app/utils/formly_templates/checkbox-list-template.html'
    });

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
