(function() {
  'use strict';

  angular
    .module('spark')
    .factory('sideMenuData', sideMenuData);

  /** @ngInject */
  function sideMenuData ( $filter, managementFlow ) {

    var self;

    // User Management section
    var userManagementSection = {
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
    };

    // Company List section
    var companyListSection = {
      name: $filter('translate')('MENU.CLIENT_MANAGEMENT.HEADING'),
      type: 'heading',
      hidden: true,
      accessLvl: 0,
      companySelectionSection: true,
      children: []
    };

    // Methodology section
    var methodologySection = {
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
    };

    // Evaluation section child object
    var planEvaluationsChildObject = {
      name: $filter('translate')('MENU.PROJECT_PLANNING.PLAN_EVALUATIONS'),
      type: 'link',
      hidden: true,
      state: 'evaluations.plan'
    };

    var assessEvaluationsChildObject = {
      name: $filter('translate')('MENU.PROJECT_PLANNING.ASSESS_EVALUATIONS'),
      type: 'link',
      hidden: true,
      state: 'evaluations.assess'
    };

    // Project creation child object
    var projectCreateChildObject = {
      name: 'New project',
      state: 'projects.create',
      type: 'link',
      showTopBorder: false
    };

    var projectsToManageSubHeader = {
      name: $filter('translate')('MENU.PROJECT_PLANNING.NO_PROJECTS'),
      type: 'sub-header'
    };

    // Planning section
    var projectPlanningSection = {
      name: $filter('translate')('MENU.PROJECT_MANAGEMENT.HEADING'),
      type: 'heading',
      accessLvl: 1,
      hidden: true,
      children: getProjectPlanningBaseChildren()
    };

    return self = {
      userManagementSection: userManagementSection,
      companyListSection: companyListSection,
      methodologySection: methodologySection,
      projectPlanningSection: projectPlanningSection,
      childObjects: {
        planEvaluationsChildObject: planEvaluationsChildObject,
        assessEvaluationsChildObject: assessEvaluationsChildObject,
        projectCreateChildObject: projectCreateChildObject,
        projectsToManageSubHeader: projectsToManageSubHeader
      },
      methods: {
        updateProjectList: updateProjectList,
        getCompanyListForMenu: getCompanyListForMenu,
        setChosenProjectMenuState: setChosenProjectMenuState
      }
    };

    function getProjectPlanningBaseChildren () {
      return [
        planEvaluationsChildObject,
        assessEvaluationsChildObject,
        projectCreateChildObject,
        projectsToManageSubHeader
      ];
    }

    function updateProjectList ( projects ) {
      self.projectPlanningSection.children = getProjectPlanningBaseChildren();

      if ( projects.length ) {

        // Set sub-header for projects to manage
        self.childObjects.projectsToManageSubHeader.name = $filter('translate')('MENU.PROJECT_PLANNING.PROJECTS_TO_MANAGE');

        // Insert each project as a menu item
        _.forEach(projects, function (project) {
          self.projectPlanningSection.children.push({
            name: project.period_start + ' - ' + project.period_end,
            value: project,
            type: 'action',
            contentType: 'project'
          });
        });

      } else {

        // Set the message that there are no projects to manage
        self.childObjects.projectsToManageSubHeader.name = $filter('translate')('MENU.PROJECT_PLANNING.NO_PROJECTS');
      }

      toggleChosenProjectMenuState(false);
    }

    function getCompanyListForMenu () {
      var children = [];
      // Add the Add company menu item to add a new company
      children.push({
        name: $filter('translate')('MENU.CLIENT_MANAGEMENT.CREATE'),
        type: 'link',
        state: 'companies.create'
      });

      // Add the subheader for company list
      children.push({
        name: $filter('translate')('MENU.CLIENT_MANAGEMENT.CLIENTS_TO_MANAGE'),
        type: 'sub-header'
      });

      _.forEach(managementFlow.getCompanyList(), function (company) {
        children.push({
          name: company.name,
          value: company,
          type: 'action',
          contentType: 'company'
        });
      });

      return children;
    }

    function toggleChosenProjectMenuState ( state ) {
      // Hide sub-header and project create items
      self.childObjects.projectsToManageSubHeader.hidden = state;
      self.childObjects.projectCreateChildObject.hidden = state;

      // Show evaluation menu items
      self.childObjects.planEvaluationsChildObject.hidden = !state;
      self.childObjects.assessEvaluationsChildObject.hidden = !state;
    }

    function setChosenProjectMenuState () {
      self.projectPlanningSection.children = getProjectPlanningBaseChildren();
      toggleChosenProjectMenuState(true);
    }

  }

})();
