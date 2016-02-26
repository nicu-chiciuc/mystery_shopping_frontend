(function() {
  'use strict';

  angular
    .module('spark')
    .factory('sideMenu', sideMenu);

  /** @ngInject */
  function sideMenu ( $rootScope, $state, principal, managementFlow, sideMenuData ) {

    var self,
      sections = [];

    if ( principal.isInShopperRole() ) {
      sections.push(sideMenuData.shopperUserType.evaluationListItem);

    } else if ( principal.isInTenantRole() ) {

      // User Management section
      sections.push(sideMenuData.userManagementSection);

      // Company List section
      sections.push(sideMenuData.companyListSection);

      // Methodology section
      sections.push(sideMenuData.methodologySection);

      // Project Planning section
      sections.push(sideMenuData.projectPlanningSection);
    } else if ( principal.isInClientRole() ) {

    }


    $rootScope.$on('$stateChangeSuccess', onStateChange);

    return self = {
      sections: sections,

      selectSection: function(section) {
        self.openedSection = section;
      },
      toggleSelectSection: function(section) {
        self.openedSection = (self.openedSection === section ? null : section);
      },
      isSectionSelected: function(section) {
        return self.openedSection === section;
      },

      selectPage: function(section, page) {
        self.currentSection = section;
        self.currentPage = page;
      },
      isPageSelected: function(page) {
        return self.currentPage === page;
      },

      unsetCurrentCompany: selectCompanySideMenuData,
      unsetCurrentProject: unsetCurrentProject,
      setProjectPlanningMenuData: setProjectPagesDependingOnSelectedCompany,
      setCompany: setCompany,
      getCompany: managementFlow.getCompany,
      setProject: setProject,
      isCompanySelected: managementFlow.isCompanySelected,
      setCompanyList: setCompanyList,
      setCompanyNotChosenMenuState: setCompanyNotChosenMenuState,
      addProjectToProjectsList: addProjectToProjectsList
    };

    function onStateChange() {
      var matchPage = function(section, page) {
        if ($state.current.name === page.state) {
          self.selectSection(section);
          self.selectPage(section, page);
        }
      };

      self.sections.forEach(function(section) {
        if (section.children) {
          // matches nested section toggles, such as API or Customization
          section.children.forEach(function(childSection){
            if(childSection.pages){
              childSection.pages.forEach(function(page){
                matchPage(childSection, page);
              });
            }
          });
        }
        else if (section.pages) {
          // matches top-level section toggles, such as Demos
          section.pages.forEach(function(page) {
            matchPage(section, page);
          });
        }
        else if (section.type === 'link') {
          // matches top-level links, such as "Getting Started"
          matchPage(section, section);
        }
      });
    }

    function setCompanyNotChosenMenuState () {
      _.forEach(self.sections, function (section) {
        if ( section.companySelectionSection ) {
          section.children = sideMenuData.methods.getCompanyListForMenu();
          section.hidden = false;
        } else if ( section.accessLvl < 1 ) {
          section.hidden = false;
        } else {
          section.hidden = true;
        }
      });
    }

    function setCompanyChosenMenuState () {
      _.forEach(self.sections, function (section) {
        if ( section.companySelectionSection ) {
          section.hidden = true;
        } else if ( section.accessLvl < 2 ) {
          section.hidden = false;
        }
      });
    }

    function setProjectChosenMenuState () {
      sideMenuData.methods.setChosenProjectMenuState();
    }

    function setProject ( project ) {
      var toState, toStateParams;
      managementFlow.setProject(project);

      setProjectChosenMenuState();

      if ( $rootScope.returnToState ) {
        if ( isNotNeutralState($rootScope.returnToState.name) ) {
          $state.go('projects.detail.edit', {projectId: project.id});
          $rootScope.returnToState = undefined;
          $rootScope.returnToStateParams = undefined;
        } else {
          toState = $rootScope.returnToState;
          toStateParams = $rootScope.returnToStateParams;
          if ( toState.nextToState ) {
            $rootScope.returnToStateParams = $rootScope.returnToState.nextToStateParams;
            $rootScope.returnToState = $rootScope.returnToState.nextToState;
          }
          $state.go(toState, toStateParams);
        }
      } else {
        $state.go('projects.detail.edit', {projectId: project.id});
      }
    }

    function addProjectToProjectsList ( project ) {
      managementFlow.addProjectToProjectsList(project);

      sideMenuData.projectPlanningSection.children.push({
        name: project.period_start + ' - ' + project.period_end,
        value: project,
        type: 'action',
        contentType: 'project',
        state: project.state
      });
    }

    function setCompany ( company ) {
      var toState, toStateParams;

      managementFlow.setCompany(company);

      // After selecting a company, populate the menu with that company's Projects.
      setProjectPagesDependingOnSelectedCompany();

      // Show/Hide menu items when a company is selected.
      setCompanyChosenMenuState();

      // TODO check here whether a state depends on previous company or not (e.g. prev company edit page) and redirect to a neutral page
      // TODO on page load for the first time, check the same thing
      // For instance, if the previous state was /companies/1/edit, but the user has chosen
      // the company with id = 2, then redirect either to /companies/2/edit, or to some other $state
      if ( $rootScope.returnToState ) {
        if ( isNotNeutralState($rootScope.returnToState.name) ) {
          $state.go('companies.detail.view', {companyId: company.id});
          $rootScope.returnToState = undefined;
          $rootScope.returnToStateParams = undefined;
        } else {
          toState = $rootScope.returnToState;
          toStateParams = $rootScope.returnToStateParams;
          if ( toState.nextToState ) {
            $rootScope.returnToStateParams = $rootScope.returnToState.nextToStateParams;
            $rootScope.returnToState = $rootScope.returnToState.nextToState;
          }
          $state.go(toState, toStateParams);
        }
      } else {
        $state.go('companies.detail.view', {companyId: company.id});
      }
    }

    function setCompanyList ( companies ) {
      managementFlow.setCompanyList(companies);
      self.unsetCurrentCompany();
    }

    function selectCompanySideMenuData () {
      managementFlow.unsetCompany();
      setCompanyNotChosenMenuState();
    }

    function unsetCurrentProject () {
      managementFlow.unsetProject();
      sideMenuData.methods.updateProjectList(managementFlow.getProjectList());
    }

    function setProjectPagesDependingOnSelectedCompany () {

      managementFlow.getCompany().getList('projects').then(getCompanyProjectsSuccessFn, getCompanyProjectsErrorFn);

      function getCompanyProjectsSuccessFn ( response ) {
        // Set projects list to the service
        managementFlow.setProjectList(response);

        // Update project list in menu
        sideMenuData.methods.updateProjectList(response);
      }
      function getCompanyProjectsErrorFn () {
        // TODO deal with the error
      }

      return sections;
    }

    // Private
    function isNotNeutralState ( state ) {
      var notNeutralStates = ['companies', 'projects', 'evaluations'];
      var stateFound = false;

      _.forEach(notNeutralStates, function (notNeutralState) {
        stateFound = stateFound || state.indexOf(notNeutralState) > -1;
      });

      return stateFound;
    }



  }

})();
