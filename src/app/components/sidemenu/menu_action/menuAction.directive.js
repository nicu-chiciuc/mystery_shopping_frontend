(function() {
  'use strict';

  angular
    .module('spark')
    .directive('menuAction', menuAction);

  /** @ngInject */
  function menuAction () {
    return {
      scope: {
        section: '='
      },
      templateUrl: 'app/components/sidemenu/menu_action/menu-action.tmpl.html',
      link: function($scope, $element) {
        var controller = $element.parent().controller();

        $scope.isSelected = function() {
          return controller.isSelected($scope.section);
        };

        $scope.selectItem = function(item, contentType) {
          if ( contentType === 'company' ) {
            controller.setCompany(item);
          } else if ( contentType === 'project' ) {
            controller.setProject(item);
          }
        };
      }
    };
  }

})();
