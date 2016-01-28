(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EditBlockTitleDialogController', EditBlockTitleDialogController);

  /** @ngInject */
  function EditBlockTitleDialogController ( $log, $scope, $mdDialog, title ) {
    $log.debug('Entered EditBlockTitleDialogController');
    console.log(title);

    $scope.placeholder = title;

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.setTitle = function( title ) {
      $mdDialog.hide(title);
    };

  }
})();
