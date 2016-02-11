(function() {
  'use strict';

  angular
    .module('spark')
    .factory('sideMenu', sideMenu);

  /** @ngInject */
  function sideMenu ( $rootScope, $state, $filter, principal, managementFlow, models ) {

    var self,
      sections = [],
      projectList = [],
      companyList = [];

    // User Management section
    sections.push({
      name: $filter('translate')('MENU.USER_MANAGEMENT.HEADING'),
      type: 'heading',
      accessLvl: 0,
      hidden: false,
      children: [
        {
          name: $filter('translate')('MENU.USER_MANAGEMENT.SHOPPERS.HEADING'),
          state: 'shoppers.create',
          type: 'toggle',
          pages: [
            {
              name: $filter('translate')('MENU.USER_MANAGEMENT.SHOPPERS.CREATE'),
              state: 'shoppers.create',
              type: 'link'
            },
            {
              name: $filter('translate')('MENU.USER_MANAGEMENT.SHOPPERS.LIST'),
              state: 'shoppers.list',
              type: 'link'
            }
          ]
        }
      ]
    });

    // Company List section
    sections.push({
      name: $filter('translate')('MENU.CLIENT_MANAGEMENT.HEADING'),
      type: 'heading',
      hidden: true,
      accessLvl: 0,
      companySelectionSection: true,
      children: companyList
    });

    // Project Management section
    sections.push({
      name: $filter('translate')('MENU.METHODOLOGY_TOOLS.HEADING'),
      type: 'heading',
      accessLvl: 1,
      hidden: true,
      children: [
        {
          name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.QUESTIONNAIRES'),
          type: 'toggle',
          pages: [
            {
              name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.CREATE_QUESTIONNAIRE'),
              state: 'questionnaires.templates.create',
              type: 'link'
            },
            {
              name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.LIST_QUESTIONNAIRES'),
              state: 'questionnaires.templates.list',
              type: 'link'
            }
          ]
        },
        {
          name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.SCRIPTS'),
          type: 'toggle',
          pages: [
            {
              name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.CREATE_SCRIPT'),
              state: 'scripts.create',
              type: 'link'
            },
            {
              name: $filter('translate')('MENU.QUESTIONNAIRE_MANAGEMENT.LIST_SCRIPTS'),
              state: 'scripts.list',
              type: 'link'
            }
          ]
        }
      ]
    });

    // Planning section
    sections.push({
      name: $filter('translate')('MENU.PROJECT_MANAGEMENT.HEADING'),
      type: 'heading',
      accessLvl: 1,
      hidden: true,
      children: [
        {
          name: 'New project',
          state: 'projects.create',
          type: 'link'
        },
        {
          name: $filter('translate')('MENU.PROJECT_MANAGEMENT.MANAGE_PROJECTS'),
          type: 'toggle',
          pages: projectList
        },
        {
          name: $filter('translate')('MENU.PROJECT_PLANNING.EVALUATIONS'),
          type: 'toggle',
          pages: [
            {
              name: 'Plan evaluations',
              state: 'evaluations.plan',
              type: 'link'
            },
            {
              name: 'Planned evaluations',
              state: 'evaluations.list',
              type: 'link'
            }
          ]
        }
      ]
    });

    $rootScope.$on('$stateChangeSuccess', onStateChange);

    if ( principal.isInAnyRole(['tenantproductmanager', 'tenantprojectmanager', 'tenantconsultant']) ) {
      //sections = getDefaultMenuDataForTenantUser();
    }

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
      //companySelectedMenuData: companySelectedMenuData,
      setProjectPlanningMenuData: setProjectPagesDependingOnSelectedCompany,
      setCompany: setCompany,
      getCompany: managementFlow.getCompany,
      setProject: setProject,
      isCompanySelected: managementFlow.isCompanySelected,
      setCompanyList: setCompanyList,
      setCompanyNotChosenMenuState: setCompanyNotChosenMenuState
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
          section.children = getCompanyListForMenu();
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

    function setProject ( project ) {
      managementFlow.setProject(project);
    }

    function setCompany ( company ) {

      function isNotNeutralState ( state ) {
        var notNeutralStates = ['companies', 'projects'];
        var stateFound = false;

        _.forEach(notNeutralStates, function (notNeutralState) {
          stateFound = stateFound || state.indexOf(notNeutralState) > -1;
        });

        return stateFound;
      }
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
        } else {
          $state.go($rootScope.returnToState, $rootScope.returnToStateParams);
        }
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

    function setProjectPagesDependingOnSelectedCompany () {

      managementFlow.getCompany().getList('projects').then(getCompanyProjectsSuccessFn, getCompanyProjectsErrorFn);
      //models.projects().getList().then(getCompanyProjectsSuccessFn, getCompanyProjectsErrorFn);

      function getCompanyProjectsSuccessFn ( response ) {
        // Set projects list to the service
        managementFlow.setProjectList(response);

        // Reset the side menu project list
        projectList.length = 0;

        _.forEach(response, function (project) {
          projectList.push({
            name: project.period_start + ' - ' + project.period_end,
            value: project,
            type: 'action',
            contentType: 'project'
          });
        });
      }
      function getCompanyProjectsErrorFn () {
        // TODO deal with the error
      }

      return sections;
    }

    function getCompanyListForMenu () {
      var children = [];
      _.forEach(managementFlow.getCompanyList(), function (company) {
        children.push({
          name: company.name,
          value: company,
          type: 'action',
          contentType: 'company'
        });
      });

      // Add the Add company menu item to add a new company
      children.push({
        name: $filter('translate')('MENU.CLIENT_MANAGEMENT.CREATE'),
        type: 'link',
        state: 'companies.create',
        showTopBorder: true
      });

      return children;
    }
  }

})();
