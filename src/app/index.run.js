(function() {
  'use strict';

  angular
    .module('spark')
    .run(runBlock);

  /** @ngInject */
  function runBlock ( $rootScope, $state, $stateParams, $filter, $log, formlyConfig, formlyValidationMessages, Restangular, modelManager, authorization, principal ) {

    formlyValidationMessages.messages.required = getRequiredMessage;
      function getRequiredMessage ($viewValue, $modelValue, scope) {
      if (scope.useGenericMessage) {
        return $filter('translate')('VALIDATION_MESSAGE.GENERIC.FIELD_IS_REQUIRED');
      } else {
        return $filter('translate')('VALIDATION_MESSAGE.SPECIFIC_FIELD_IS_REQUIRED', {FIELD_NAME: scope.to.label});
      }
    }

    // Config checkbox list template for angular-formly.
    formlyConfig.setType({
      name: 'checkbox-list',
      templateUrl: 'app/utils/formly_templates/checkbox-list-template.html'
    });

    formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

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

    Restangular.extendModel('projectworkers', function (obj) {
      angular.extend(obj, modelManager.ProjectWorkerModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('tenantprojectmanagers', function (obj) {
      angular.extend(obj, modelManager.ProjectManagerModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('questionnaires', function (obj) {
      return angular.extend(obj, modelManager.QuestionnaireModel);
    });

    $log.debug('runBlock end');
  }

})();
