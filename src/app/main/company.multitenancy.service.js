(function() {
  'use strict';

  angular
    .module('spark')
    .factory('managementFlow', managementFlow);

  /** @ngInject */
  function managementFlow ( $rootScope, $q, $state ) {
    var self;

    return self = {
      setCompanyList: function(companies) {
        self.companies = companies;
      },
      getCompanyList: function() {
        return self.companies || [];
      },
      isSetCompanyList: function() {
        return !!self.companies;
      },

      setCompany: function(company) {
        self.company = company;
      },
      getCompany: function() {
        return self.company;
      },
      getCompanyPromise: function() {
        var deferred = $q.defer();
        deferred.resolve(self.company);

        return deferred.promise;
      },
      isCompanySelected: function() {
        return !!self.company;
      },
      unsetCompany: function () {
        self.company = undefined;
      },
      authorizeCompany: function () {
        self.getCompanyPromise()
          .then(function( company ) {
            var isCompanySelected = self.isCompanySelected();

            if (!isCompanySelected) {
              // user is not authenticated. stow the state they wanted before you
              // send them to the signin state, so you can return them when you're done
              $rootScope.returnToState = $rootScope.toState;
              $rootScope.returnToStateParams = $rootScope.toStateParams;

              $state.go('chooseCompany');
            }

            return company;
          });
      },

      setProject: function(project) {
        self.project = project;
      },
      getProject: function() {
        return self.project;
      },
      isProjectSelected: function() {
        return !!self.project;
      },
      deselectProject: function () {
        self.project = undefined;
      }
    };

  }

})();
