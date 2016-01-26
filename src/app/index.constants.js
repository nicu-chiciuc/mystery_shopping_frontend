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
    .constant('urls', jsonServerUrls)
    .constant('contentTypes', contentTypes);

})();
