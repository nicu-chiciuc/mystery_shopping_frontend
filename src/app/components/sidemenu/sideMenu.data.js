/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('sideMenuData', sideMenuData);

  /** @ngInject */
  function sideMenuData ( $filter, principal, managementFlow ) {

    var self;

    /* ***********************
     * Admin User menu items
     * ***********************/
    // Settings
    var adminManagementSection = {
      name: $filter('translate')('MENU.ADMIN.HEADING'),
      type: 'heading',
      accessLvl: 0,
      hidden: false,
      children: [
        {
          name: $filter('translate')('MENU.ADMIN.UPLOADS.HEADING'),
          type: 'toggle',
          pages: [
            {
              name: $filter('translate')('MENU.ADMIN.UPLOADS.LOCALITIES'),
              state: 'admin.uploadLocalities',
              type: 'link'
            }
          ]
        }
      ]
    };

    /* ***********************
     * Shopper User menu items
     * ***********************/
    // Evaluation list
    var evaluationListItem = {
      name: $filter('translate')('MENU.SHOPPERS.EVALUATION_LIST'),
      state: 'shopperevaluations.list',
      type: 'link'
    };

    /* *********************
    * Tenant User menu items
    * **********************/
    // User Management section
    var userManagementSection = {
      name: $filter('translate')('MENU.USER_MANAGEMENT.HEADING'),
      type: 'heading',
      accessLvl: 0,
      hidden: false,
      children: [
        {
          name: $filter('translate')('MENU.USER_MANAGEMENT.SHOPPERS.HEADING'),
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

    var companiesToManageSubHeader = {
      name: $filter('translate')('MENU.CLIENT_MANAGEMENT.NO_CLIENTS'),
      type: 'sub-header'
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

    var gridPanelChildObject = {
      name: $filter('translate')('MENU.PROJECT_PLANNING.EDIT_GRID_PANEL'),
      type: 'toggle',
      pages: [
        {
          name: $filter('translate')('MENU.GRIDPANEL_MANAGEMENT.CREATE_GRIDPANEL'),
          state: 'gridpanel.create',
          type: 'link'
        },
        {
          name: $filter('translate')('MENU.GRIDPANEL_MANAGEMENT.LIST_GRIDPANELS'),
          state: 'gridpanel.list',
          type: 'link'
        }
      ]
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
      adminManagementSection: adminManagementSection,
      childObjects: {
        planEvaluationsChildObject: planEvaluationsChildObject,
        assessEvaluationsChildObject: assessEvaluationsChildObject,
        projectCreateChildObject: projectCreateChildObject,
        projectsToManageSubHeader: projectsToManageSubHeader,
        gridPanelChildObject: gridPanelChildObject,
        companiesToManageSubHeader: companiesToManageSubHeader
      },
      methods: {
        updateProjectList: updateProjectList,
        getCompanyListForMenu: getCompanyListForMenu,
        setChosenProjectMenuState: setChosenProjectMenuState
      },
      shopperUserType: {
        evaluationListItem: evaluationListItem
      }
    };

    function getProjectPlanningBaseChildren () {
      var projectSectionElements = [
        planEvaluationsChildObject,
        assessEvaluationsChildObject,
        gridPanelChildObject,
        projectsToManageSubHeader
      ];
      if ( principal.canCreateProjects() ) {
        projectSectionElements.splice(2, 0, projectCreateChildObject);
      }
      return projectSectionElements;
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
            contentType: 'project',
            state: project.state
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
      if ( principal.canCreateCompanies() ) {
        children.push({
          name: $filter('translate')('MENU.CLIENT_MANAGEMENT.CREATE'),
          type: 'link',
          state: 'companies.create'
        });
      }

      // Add the subheader for company list
      if ( managementFlow.isSetCompanyList() ) {
        self.childObjects.companiesToManageSubHeader.name = $filter('translate')('MENU.CLIENT_MANAGEMENT.CLIENTS_TO_MANAGE');
      } else {
        self.childObjects.companiesToManageSubHeader.name = $filter('translate')('MENU.CLIENT_MANAGEMENT.NO_CLIENTS');
      }
      children.push(self.childObjects.companiesToManageSubHeader);

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
      self.childObjects.gridPanelChildObject.hidden = !state;
    }

    function setChosenProjectMenuState () {
      self.projectPlanningSection.children = getProjectPlanningBaseChildren();
      toggleChosenProjectMenuState(true);
    }

  }

})();
