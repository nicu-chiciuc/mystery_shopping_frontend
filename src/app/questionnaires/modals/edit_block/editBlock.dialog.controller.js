(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EditBlockDialogController', EditBlockDialogController);

  /** @ngInject */
  function EditBlockDialogController ( $log, $scope, $mdDialog, $mdToast, block, parentBlock ) {
    $log.debug('Entered EditBlockDialogController');
    $log.debug(block);

    $scope.block = block;
    $scope.parentBlock = parentBlock;

    $scope.updateAvailableWeight = updateAvailableWeight;

    activate();

    function activate () {
      $scope.availableWeight = $scope.parentBlock.availableWeight + $scope.block.weight;
      $scope.otherBlocks = _.filter($scope.parentBlock.template_blocks, function (templateBlock) {
        return templateBlock.title !== block.title;
      });
    }

    function updateAvailableWeight ( form, field ) {
      console.log($scope.hzFOrm);
      console.log(form);
      var availableWeight = $scope.parentBlock.computeAvailableWeight();
      if ( availableWeight >= 0 ) {
        $scope.parentBlock.setAvailableWeight(availableWeight);
        $scope.availableWeight = availableWeight + block.weight;
      } else {

      }
    }

    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.saveBlockChanges = function( block, isValid, form ) {
      console.log(form);
      if ( isValid ) {
        $mdDialog.hide(title);
      }
    };

  }
})();
