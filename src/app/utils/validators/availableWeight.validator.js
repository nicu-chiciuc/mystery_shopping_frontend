(function() {
  'use strict';  angular
    .module('spark')
    .directive('availableWeight', availableWeight);

  /** @ngInject */
  function availableWeight() {
    return {
      require: 'ngModel',
      scope: {
        availableWeight: '='
      },
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$parsers.push(function( viewValue ) {
          if ( viewValue <= scope.availableWeight ) {
            ctrl.$setValidity('availableWeight', true);
            return viewValue;
          } else {
            ctrl.$setValidity('availableWeight', false);
            return viewValue;
          }
        });
      }
    };  }})();