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
        self.unsetProject();
      },
      addCompanyToCompaniesList: function ( company ) {
        self.companies.push(company);
      },
      authorizeCompany: function () {
        self.getCompanyPromise()
          .then(function( company ) {
            var isCompanySelected = self.isCompanySelected();
            var prevReturnToState, prevReturnToStateParams;

            if (!isCompanySelected) {
              // user is not authenticated. stow the state they wanted before you
              // send them to the signin state, so you can return them when you're done
              if ( $rootScope.returnToState ) {
                prevReturnToState = $rootScope.returnToState;
                prevReturnToStateParams = $rootScope.returnToStateParams;
              }
              $rootScope.returnToState = $rootScope.toState;
              $rootScope.returnToStateParams = $rootScope.toStateParams;
              $rootScope.toState.nextToState = prevReturnToState;
              $rootScope.toState.nextToStateParams = prevReturnToStateParams;

              $state.go('chooseCompany');
            }

            return company;
          });
      },

      setProjectList: function(projects) {
        self.projects = projects;
      },
      getProjectList: function() {
        return self.projects || [];
      },
      isSetProjectList: function() {
        return !!self.projects;
      },

      setProject: function(project) {
        self.project = project;
      },
      getProject: function() {
        return self.project;
      },
      getProjectPromise: function() {
        var deferred = $q.defer();
        deferred.resolve(self.project);

        return deferred.promise;
      },
      isProjectSelected: function() {
        return !!self.project;
      },
      unsetProject: function () {
        self.project = undefined;
      },

      authorizeProject: function () {
        self.getProjectPromise()
          .then(function( project ) {
            var isProjectSelected = self.isProjectSelected();
            var prevReturnToState, prevReturnToStateParams;

            if (!isProjectSelected) {
              // user is not authenticated. stow the state they wanted before you
              // send them to the signin state, so you can return them when you're done
              if ( $rootScope.returnToState ) {
                prevReturnToState = $rootScope.returnToState;
                prevReturnToStateParams = $rootScope.returnToStateParams;
              }
              $rootScope.returnToState = $rootScope.toState;
              $rootScope.returnToStateParams = $rootScope.toStateParams;
              $rootScope.toState.nextToState = prevReturnToState;
              $rootScope.toState.nextToStateParams = prevReturnToStateParams;

              $state.go('chooseProject');
            }

            return project;
          });
      }
    };

  }

})();
