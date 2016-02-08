/* global moment:false */
(function() {
  'use strict';

  var urls = {
    API_URL: 'http://localhost:8000/api/v1/',
    DOMAIN_URL: 'http://localhost:8000/',
    STORAGE_COOKIE_DOMAIN: ''
  };

  var jsonServerUrls = {
    API_URL: 'http://localhost:4000/api/v1/',
    DOMAIN_URL: 'http://localhost:4000/',
    STORAGE_COOKIE_DOMAIN: ''
  };

  var contentTypes = {
    department: 25,
    entity: 26,
    section: 27,
    tenantproductmanager: 14,
    tenantprojectmanager: 15,
    tenantconsultant: 16,
    clientprojectmanager: 17,
    clientmanager: 18,
    clientemployee: 19,
    shopper: 20
  };

  var contentTypesWork = {
    department: 24,
    entity: 25,
    section: 26,
    tenantproductmanager: 13,
    tenantprojectmanager: 14,
    tenantconsultant: 15,
    clientprojectmanager: 16,
    clientmanager: 17,
    clientemployee: 18,
    shopper: 19
  };

  angular
    .module('spark')
    .constant('moment', moment)
    .constant('urls', urls)
    .constant('contentTypes', contentTypesWork);

})();
