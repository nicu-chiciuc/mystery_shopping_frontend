(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyFormController', CompanyFormController);

  /** @ngInject */
  function CompanyFormController ( $log, $filter, company ) {
    $log.debug('Entered CompanyFormController');

    var vm = this;

    $log.debug(company);

    vm.company = {};
    vm.submit = function () {};

    vm.companyFields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: $filter('translate')('COMPANY.NAME'),
          placeholder: $filter('translate')('COMPANY.PLACEHOLDER.NAME')
        }
      },
      {
        key: 'domain',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: $filter('translate')('COMPANY.DOMAIN'),
          placeholder: $filter('translate')('COMPANY.PLACEHOLDER.DOMAIN')
        }
      },
      {
        key: 'industry',
        type: 'select',
        templateOptions: {
          label: $filter('translate')('COMPANY.INDUSTRY'),
          labelProp: 'name',
          valueProp: 'id',
          options: [
            {name: 'Consulting', id: 2},
            {name: 'IT', id: 1}
          ]
          //placeholder: $filter('translate')('COMPANY.PLACEHOLDER.INDUSTRY')
        }
      },
      {
        key: 'country',
        type: 'select',
        templateOptions: {
          label: $filter('translate')('COMPANY.COUNTRY'),
          labelProp: 'name',
          valueProp: 'id',
          options: [
            {name: 'Moldova', id: 2},
            {name: 'Great Britain', id: 1},
            {name: 'New Zealand', id: 3}
          ]
          //placeholder: $filter('translate')('COMPANY.PLACEHOLDER.INDUSTRY')
        }
      },
      {
        key: 'contact_person',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: $filter('translate')('COMPANY.CONTACT_PERSON'),
          placeholder: $filter('translate')('COMPANY.PLACEHOLDER.CONTACT_PERSON')
        }
      },
      {
        key: 'contact_phone',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: $filter('translate')('COMPANY.CONTACT_PHONE'),
          placeholder: $filter('translate')('COMPANY.PLACEHOLDER.CONTACT_PHONE')
        }
      },
      {
        key: 'contact_email',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: $filter('translate')('COMPANY.CONTACT_EMAIL'),
          placeholder: $filter('translate')('COMPANY.PLACEHOLDER.CONTACT_EMAIL')
        }
      }
    ];
    activate();

    function activate() {
    }

  }
})();
