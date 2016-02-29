/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .controller('AdminUploadLocalitiesController', AdminUploadLocalitiesController);

  /** @ngInject */
  function AdminUploadLocalitiesController ( $timeout, Upload, urls ) {
    var vm = this;

    vm.submitLocalitiesCsvFile = submitLocalitiesCsvFile;

    function submitLocalitiesCsvFile ( file ) {
      vm.productSuppliersUploadingInProcess = true;

      file.upload = Upload.upload({
        url: urls.API_URL + 'common/upload/localities/',
        data: {file: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          vm.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  }
})();
