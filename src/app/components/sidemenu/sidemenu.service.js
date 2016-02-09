(function() {
  'use strict';

  angular
    .module('spark')
    .factory('sideMenu', sideMenu);

  /** @ngInject */
  function sideMenu ( $rootScope, $state, $filter, managementFlow, models ) {

    var self;

    $rootScope.$on('$stateChangeSuccess', onStateChange);

    return self = {
      sections: [],

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
      setNormalMenuData: normalMenuData,
      setProjectPlanningMenuData: projectPlanningMenuData,
      setCompany: setCompany,
      getCompany: managementFlow.getCompany,
      setProject: setProject,
      isCompanySelected: managementFlow.isCompanySelected,
      setCompanyList: setCompanyList
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

    function setProject ( project ) {
      managementFlow.setProject(project);
    }

    function setCompany ( company ) {
      managementFlow.setCompany(company);
      self.setNormalMenuData();
      if ( $rootScope.returnToState ) {
        $state.go($rootScope.returnToState, $rootScope.returnToStateParams);
      }
    }

    function setCompanyList ( companies ) {
      managementFlow.setCompanyList(companies);
      self.unsetCurrentCompany();
    }

    function selectCompanySideMenuData () {
      var companiesMenuLinks = [],
        sections;

      managementFlow.unsetCompany();

      _.forEach(managementFlow.getCompanyList(), function (company) {
        companiesMenuLinks.push({
          name: company.name,
          value: company,
          type: 'action',
          contentType: 'company'
        });
      });

      sections = [
        {
          name: $filter('translate')('MENU.CLIENT_MANAGEMENT.CREATE'),
          type: 'link',
          state: 'companies.create'
        },
        {
          name: $filter('translate')('MENU.CLIENT_MANAGEMENT.HEADING'),
          type: 'heading',
          children: companiesMenuLinks
        }
      ];

      self.sections = sections;
    }

    function normalMenuData () {
      var sections = [];

      // User Management section
      sections.push({
        name: $filter('translate')('MENU.USER_MANAGEMENT.HEADING'),
        type: 'heading',
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
          },
          {
            name: $filter('translate')('MENU.USER_MANAGEMENT.CONSULTANTS.HEADING'),
            state: 'shoppers.list',
            type: 'toggle',
            pages: [
              {
                name: $filter('translate')('MENU.USER_MANAGEMENT.CONSULTANTS.CREATE'),
                state: 'shoppers.create',
                type: 'link'
              },
              {
                name: $filter('translate')('MENU.USER_MANAGEMENT.CONSULTANTS.LIST'),
                state: 'shoppers.list',
                type: 'link'
              }
            ]
          }
        ]
      });

      // Project Management section
      sections.push({
        name: $filter('translate')('MENU.METHODOLOGY_TOOLS.HEADING'),
        type: 'heading',
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

      self.sections = sections;

      self.setProjectPlanningMenuData();
    }


    function projectPlanningMenuData () {

      var projectList = [];



      //managementFlow.getCompany().getList('projects').then(getCompanyProjectsSuccessFn, getCompanyProjectsErrorFn);
      models.projects().getList().then(getCompanyProjectsSuccessFn, getCompanyProjectsErrorFn);

      function getCompanyProjectsSuccessFn ( response ) {
        _.forEach(response, function (project) {
          projectList.push({
            name: project.period_start + ' - ' + project.period_end,
            value: project,
            type: 'action',
            contentType: 'project'
          });
        });

        // Planning section
        self.sections.push({
          name: $filter('translate')('MENU.PROJECT_MANAGEMENT.HEADING'),
          type: 'heading',
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
      }
      function getCompanyProjectsErrorFn () {
        // TODO deal with the error
      }

    }
  }

})();
