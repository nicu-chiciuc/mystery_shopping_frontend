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
        genericRequiredFieldMessage: translatedFieldMessage,
        genericRequiredQtyFieldMessage: genericRequiredQtyFieldMessage,
        genericRequiredAllFields: genericRequiredAllFields 
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
    function genericRequiredQtyFieldMessage ( fieldTranslationKey ) {
      var translatedItemName = $filter('translate')(fieldTranslationKey);
      return $filter('translate')('VALIDATION_MESSAGE.GENERIC.AT_LEAST_ONE_REQUIRED', {ITEM: translatedItemName});
    }
    function genericRequiredAllFields (fieldTranslationKey) {
      var translatedItemName = $filter('translate')(fieldTranslationKey);
      return $filter('translate')('VALIDATION_MESSAGE.GENERIC.ALL_ARE_REQUIRED', {ITEMS: translatedItemName});
    }
    

    /*
     * Number methods
     */
    function strip(number) {
      return parseFloat(number.toPrecision(12));
    }
  }
})();
