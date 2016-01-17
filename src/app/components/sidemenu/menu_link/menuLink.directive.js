(function() {
  'use strict';

  angular
    .module('spark')
    .directive('menuLink', menuLink);

  /** @ngInject */
  function menuLink () {
    return {
      scope: {
        section: '='
      },
      templateUrl: 'app/components/sidemenu/menu_link/menu-link.tmpl.html',
      link: function($scope, $element) {
        var controller = $element.parent().controller();

        $scope.isSelected = function() {
          return controller.isSelected($scope.section);
        };

        $scope.focusSection = function() {
          // set flag to be used later when
          // $locationChangeSuccess calls openPage()
          controller.autoFocusContent = true;
        };
      }
    };
  }

})();
