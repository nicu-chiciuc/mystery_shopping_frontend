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
      },
      translation: {
        genericSaveSuccessToast: genericSaveSuccessToast,
        genericSaveErrorToast: genericSaveErrorToast,
        genericRequiredFieldMessage: translatedFieldMessage
      },
      number: {
        strip: strip
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

    /*
    * Translation methods
    */
    function genericSaveSuccessToast ( fieldTranslationKey ) {
      var translatedItemName = $filter('translate')(fieldTranslationKey);
      return $filter('translate')('TOAST.GENERIC.ITEM_SAVE_SUCCESS', {ITEM: translatedItemName});
    }

    function genericSaveErrorToast ( fieldTranslationKey ) {
      var translatedItemName = $filter('translate')(fieldTranslationKey);
      return $filter('translate')('TOAST.GENERIC.ITEM_SAVE_ERROR', {ITEM: translatedItemName});
    }

    /*
     * Number methods
     */
    function strip(number) {
      return parseFloat(number.toPrecision(12));
    }
  }
})();
