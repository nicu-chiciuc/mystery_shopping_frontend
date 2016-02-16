(function() {
  'use strict';

  angular
    .module('spark')
    .factory('msUtils', msUtils);

  /** @ngInject */
  function msUtils ( $filter ) {
    var msUtilsFactory = {
      validation: {
        translatedFieldMessage: translatedFieldMessage
      }
    };

    return msUtilsFactory;

    /*
    * Validation methods
    */
    function translatedFieldMessage ( fieldTranslationKey ) {
      var translatedFieldName = $filter('translate')(fieldTranslationKey);
      return $filter('translate')('VALIDATION_MESSAGE.SPECIFIC_FIELD_IS_REQUIRED', {FIELD_NAME: translatedFieldName});
    }
  }
})();
